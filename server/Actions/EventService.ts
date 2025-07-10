// import Event from '../Actions/Event';
// import User from '../Factory/User';
// import EventModel from '../models/event.model';
// import Head from '../Factory/Head';
// import Chairman from '../Factory/Chairman';

// class EventService {
//   static async createEvent(data: any, createdBy: User) {
//     // Only Head or Chairman can create events
//     if (!(createdBy instanceof Head || createdBy instanceof Chairman)) {
//       throw new Error('Unauthorized: Only Head or Chairman can create events');
//     }
//     const {
//       title,
//       description,
//       date,
//       location,
//       speakers,
//       sponsors,
//       timeline,
//       eventForm,
//       registrationDeadline,
//       maxParticipants
//     } = data;

//     const domainEvent = new Event(
//       title,
//       description,
//       createdBy,
//       new Date(date),
//       location,
//       new Map(Object.entries(speakers || {})),
//       sponsors || [],
//       new Map(Object.entries(timeline || {})),
//       [],
//       eventForm,
//       new Date(registrationDeadline),
//       maxParticipants
//     );

//     const eventDocument = {
//       title: domainEvent.getTitle(),
//       description: domainEvent.getDescription(),
//       date: domainEvent.getDate(),
//       location: domainEvent.location,
//       speakers: Object.fromEntries(domainEvent.speakers),
//       sponsors: domainEvent.sponsors,
//       timeline: Object.fromEntries(domainEvent.timeline),
//       shareableLink: domainEvent.getEventForm(), 
//     };

//     const savedEvent = await EventModel.create(eventDocument);
//     return savedEvent;
//   }
// }
import Event from '../Actions/Event';
import User from '../Factory/User';
import EventModel from '../models/event.model';
import Head from '../Factory/Head';
import Chairman from '../Factory/Chairman';
import { APP_ORIGIN } from '../constants/env';

class EventService {
  static async createEvent(data: any, createdBy: User) {
    // Only Head or Chairman can create events
    if (!(createdBy instanceof Head || createdBy instanceof Chairman)) {
      throw new Error('Unauthorized: Only Head or Chairman can create events');
    }
    const {
      title,
      description,
      eventStarts,
      eventEnds,
      location,
      speakers,
      sponsors,
      eventForm,
      registrationDeadline,
      maxParticipants,
      status
    } = data;

    // Use the UserActions pattern for event creation
    const event = new Event(
      title,
      description,
      createdBy,
      new Date(eventStarts),
      new Date(eventEnds),
      location,
      new Map(Object.entries(speakers || {})),
      sponsors || [],
      [], // participants
      eventForm,
      new Date(registrationDeadline),
      maxParticipants,
      status
    );

    // Prepare the document using only public getters
    const eventDocument = {
      title: event.getTitle(),
      description: event.getDescription(),
      date: event.getDate(),
      eventStarts: event.eventStarts,
      eventEnds: event.eventEnds,
      location: event.location,
      speakers: Object.fromEntries(event.speakers),
      sponsors: event.sponsors,
      eventForm: event.getEventForm(),
      registrationDeadline: event.registrationDeadline,
      maxParticipants: event.maxParticipants,
      status: event.getStatus(),
      participants: event.getParticipants().map((user) => user.getId?.()?? null), // Adjust as per your User model
      createdBy: createdBy.getId?.() ?? null // Adjust as per your User model
    };

    const savedEvent = await EventModel.create(eventDocument);
    return savedEvent;
  }

  static async editEvent(event: Event, user: User, updates: Partial<{
    title: string;
    description: string;
    location: string;
    date: Date;
    registrationDeadline: Date;
    speakers: Map<string, any>;
    sponsors: Array<string>;
    maxParticipants: number;
    eventForm: any;
  }>) {
    // Use the editEvent logic from UserActions
    event.editDetails(user, updates);
  
   
    const updatedEvent = await EventModel.findByIdAndUpdate(
      event.getId?.() , // Adjust as per your Event model
      {
        title: event.getTitle(),
        description: event.getDescription(),
        date: event.getDate(),
        location: event.location,
        speakers: Object.fromEntries(event.speakers),
        sponsors: event.sponsors,
        eventForm: event.getEventForm(),
        registrationDeadline: event.registrationDeadline,
        maxParticipants: event.maxParticipants,
        status: event.getStatus(),
        participants: event.getParticipants().map((user) => user.getId() ?? null),
      },
      { new: true }
    );
    return updatedEvent;
  }

  static async deleteEvent(event: Event, user: User) {
    event.deleteEvent(user);
    // Remove or mark as cancelled in the database
    const deletedEvent = await EventModel.findByIdAndUpdate(
      event.getId?.() ?? null, // Adjust as per your Event model
      { status: event.getStatus() },
      { new: true }
    );
    return deletedEvent;
  }
  static async getEventById(eventId: string) {
    const eventDoc = await EventModel.findById(eventId);
    if (!eventDoc) {  
      throw new Error('Event not found');
    }
    const event = Event.fromDocument(eventDoc);
    return event;
}
static async addParticipant(event: Event, user: User) {
    if (!event.registerParticipant(user)) {
      throw new Error('Failed to register participant');
    }
  
    const updatedEvent = await EventModel.findByIdAndUpdate(
      event.getId?.() ?? null, // Adjust as per your Event model
      { participants: event.getParticipants().map((u) => u.getId?.() ?? null) },
      { new: true }
    );
    
    return updatedEvent;
  }
  static async getEvents(): Promise<Event[]> {
    return Event.getEvents();

  }
}

export default EventService;