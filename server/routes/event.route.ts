import { Router, Request, Response } from 'express';
import EventService from '../Actions/EventService';
import UserModel from '../models/user.model';
import UserFactory, { Role } from '../Factory/UserFactory';
import EventModel from '../models/event.model';
import Event from '../Actions/Event';
import { requireAuth, AuthenticatedRequest } from '../utils/authMiddleware';
import User from'../Factory/User';
import GoogleFormsService from '../Actions/GoogleFormsService';

const router = Router();
const googleFormsService = new GoogleFormsService();

// Helper function to handle async routes
const asyncHandler = (fn: (req: Request, res: Response) => Promise<void>) => {
  return (req: Request, res: Response) => {
    Promise.resolve(fn(req, res)).catch((error) => {
      console.error('Unhandled error in route:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    });
  };
};

// Helper function to get user from database
const getUserFromDatabase = async (createdBy: string) => {
  const userDoc = await UserModel.findById(createdBy);
  if (!userDoc) {
    throw new Error('User not found');
  }
  const userFactory = new UserFactory();
  return userFactory.fromDocument(userDoc);
};

router.post('/create', asyncHandler(async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,
      createdBy,
      date,
      location,
      speakers,
      sponsors,
      timeline,
      registrationDeadline,
      maxParticipants,
      status
    } = req.body;

    console.log('Request received:', req.body);

    // Validate user exists
    const user = await UserModel.findById(createdBy);
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
    }

    const formData = await googleFormsService.createForm(
      `${title} - Registration Form`
    );

    const template = googleFormsService.getEventFormTemplate('default', {
      title,
      description
    });

    await googleFormsService.addQuestions(formData.formId, req.body.questions ? [template.questions, ...req.body.questions] : template.questions);
    await googleFormsService.updateFormSettings(formData.formId, template.settings);

   
    const event = await EventModel.create({
      title,
      description,
      createdBy,
      date,
      location,
      speakers,
      sponsors,
      timeline,
      registrationDeadline,
      maxParticipants,
      status,
      eventForm: formData.formUrl,
      googleForm: {
        formId: formData.formId,
        formUrl: formData.formUrl,
        editUrl: formData.editUrl,
        isActive: true,
        syncEnabled: true,
      }
    });

    res.status(201).json({
      success: true,
      message: 'Event created and form generated',
      event
    });

  } catch (error: any) {
    console.error('Error in /create:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}));

// EDIT EVENT ROUTE
router.put('/edit/:id', asyncHandler(async (req: Request, res: Response) => {
  const { createdBy, ...updates } = req.body;
  const eventId = req.params.id;

  // Validate required fields
  if (!createdBy) {
    res.status(400).json({ success: false, error: 'Missing createdBy' });
    return;
  }

  if (!updates || Object.keys(updates).length === 0) {
    res.status(400).json({ success: false, error: 'No updates provided' });
    return;
  }

  try {
    // Fetch user and event from DB
    const user = await getUserFromDatabase(createdBy);
    
    const eventDoc = await EventModel.findById(eventId);
    if (!eventDoc) {
      res.status(404).json({ success: false, error: 'Event not found' });
      return;
    }

    const event = Event.fromDocument(eventDoc);

    // Call the service to edit the event
    const updatedEvent = await EventService.editEvent(event, user, updates);

    res.json({ success: true, event: updatedEvent });
  } catch (error: any) {
    if (error.message === 'User not found') {
      res.status(404).json({ success: false, error: error.message });
    } else if (error.name === 'ValidationError' || error.name === 'BusinessRuleError') {
      res.status(400).json({ success: false, error: error.message });
    } else if (error.name === 'UnauthorizedError') {
      res.status(403).json({ success: false, error: error.message });
    } else {
      throw error; // Let asyncHandler catch it
    }
  }
}));

router.get('/getevents', asyncHandler(async (req: Request, res: Response) => {

router.get('/getevents', asyncHandler(async (req: Request, res: Response) => {
  try { 
    const events = await EventService.getEvents();
    res.json({ success: true, events });
  } catch (error: any) {
    console.error('Error fetching events:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch events' });
  }
}));

// GET EVENT ROUTE (if needed)
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const eventId = req.params.id;
  
  try {
    const eventDoc = await EventModel.findById(eventId);
    if (!eventDoc) {
      res.status(404).json({ success: false, error: 'Event not found' });
      return;
    }

    const event = Event.fromDocument(eventDoc);
    res.json({ success: true, event });
  } catch (error: any) {
    throw error; // Let asyncHandler catch it
  }
}));

// DELETE EVENT ROUTE (if needed)
router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.body;
  const eventId = req.params.id;

  if (!userId) {
    res.status(400).json({ success: false, error: 'Missing userId' });
    return;
  }

  try {
    const user = await getUserFromDatabase(userId);
    
    const eventDoc = await EventModel.findById(eventId);
    if (!eventDoc) {
      res.status(404).json({ success: false, error: 'Event not found' });
      return;
    }

    const event = Event.fromDocument(eventDoc);
    
    // Assuming you have a delete method in your service
    await EventService.deleteEvent(event, user);
    
    res.json({ success: true, message: 'Event deleted successfully' });
  } catch (error: any) {
    if (error.message === 'User not found') {
      res.status(404).json({ success: false, error: error.message });
    } else if (error.name === 'UnauthorizedError') {
      res.status(403).json({ success: false, error: error.message });
    } else {
      throw error; // Let asyncHandler catch it
    }
  }
}));

        
  router.put('/addparticipant/:id', asyncHandler(async (req: Request, res: Response) => {
  const eventId = req.params.id;
  const userId = req.body.userId;

  if (!userId) {
    res.status(400).json({ success: false, error: 'No userId provided in body' });
    return; // just return nothing
  }

  try {
    const user = await getUserFromDatabase(userId);
    const eventDoc = await EventModel.findById(eventId);
    if (!eventDoc) {
      res.status(404).json({ success: false, error: 'Event not found' });
      return;
    }
   const now = new Date();
    const deadline = new Date(eventDoc.registrationDeadline);

    if (now > deadline) {
      res.status(400).json({
        success: false,
        error: `Registration is closed. Deadline was on ${deadline.toDateString()}`
      });
      return;
    }
    const event = Event.fromDocument(eventDoc);
    const updatedEvent = await EventService.registerParticipant(eventId, userId);

    if (!updatedEvent) {
  res.status(500).json({ success: false, error: 'Failed to update event' });
  return;
}

res.json({ success: true, event: updatedEvent.toObject() });
  } catch (error: any) {
    if (error.message === 'User not found') {
      res.status(404).json({ success: false, error: error.message });
    } else {
      throw error; // let asyncHandler handle other errors
    }
  }
}));

router.put('/forms/:formId', asyncHandler(async (req, res) => {
  const { formId } = req.params;
  const { questions } = req.body;

  if (!questions || !Array.isArray(questions)) {
     res.status(400).json({ success: false, error: 'Invalid or missing questions array' });
  }

  try {
    await googleFormsService.addQuestions(formId, questions);
    res.status(200).json({ success: true, message: 'Questions added to form' });
    const form = await googleFormsService.getForm(formId);
    console.log('Form items:', form.items)
  } catch (error) {
    console.error('Error in PUT /forms/:formId:', error);
    res.status(500).json({ success: false, error: 'Failed to add questions to form' });
  }
}));



export default router;