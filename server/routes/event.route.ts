import { Router, Request, Response } from 'express';
import EventService from '../Actions/EventService';
import UserModel from '../models/user.model';
import UserFactory, { Role } from '../Factory/UserFactory';
import EventModel from '../models/event.model';
import Event from '../Actions/Event';

const router = Router();

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
const getUserFromDatabase = async (userId: string) => {
  const userDoc = await UserModel.findById(userId);
  if (!userDoc) {
    throw new Error('User not found');
  }
  const userFactory = new UserFactory();
  return userFactory.fromDocument(userDoc);
};

// CREATE EVENT ROUTE
router.post('/create', asyncHandler(async (req: Request, res: Response) => {
  const { userId, ...eventData } = req.body;
  
  if (!userId) {
    res.status(400).json({ success: false, error: 'Missing userId' });
    return;
  }

  try {
    const user = await getUserFromDatabase(userId);
    const createdEvent = await EventService.createEvent(eventData, user);
    res.status(201).json({ success: true, event: createdEvent });
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

// EDIT EVENT ROUTE
router.put('/edit/:id', asyncHandler(async (req: Request, res: Response) => {
  const { userId, ...updates } = req.body;
  const eventId = req.params.id;

  // Validate required fields
  if (!userId) {
    res.status(400).json({ success: false, error: 'Missing userId' });
    return;
  }

  if (!updates || Object.keys(updates).length === 0) {
    res.status(400).json({ success: false, error: 'No updates provided' });
    return;
  }

  try {
    // Fetch user and event from DB
    const user = await getUserFromDatabase(userId);
    
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
 
//  router.put('/addparticipant/:id', asyncHandler(async (req: Request, res: Response) => {        
//   const { userId } = req.body;  
//   const eventId = req.params.id;  
//   if (!userId) {
//     res.status(400).json({ success: false, error: 'Missing userId' });
//     return;
//   } 
//   try {
//     const user = await getUserFromDatabase(userId);
//     const eventDoc = await EventModel
//       .findById(eventId);
//     if (!eventDoc) {
//       res.status(404).json({ success: false, error: 'Event not found'
//       });
//       return;
//     }

//   } catch (error: any) {
//     if (error.message === 'User not found') {
//       res.status(404).json({ success: false, error: error.message });
//     } else if (error.name === 'UnauthorizedError') {
//       res.status(403).json({ success: false, error: error.message });
//     } else {
//       throw error; // Let asyncHandler catch it
//     }
//   }
// }));

export default router;