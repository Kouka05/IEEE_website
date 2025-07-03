import Event from '../Actions/Event';
import User from '../Factory/User';
import EventModel from '../models/event.model';
import Head from '../Factory/Head';
import Chairman from '../Factory/Chairman';

class EventService {
  static async createEvent(data: any, createdBy: User) {
    // Only Head or Chairman can create events
    if (!(createdBy instanceof Head || createdBy instanceof Chairman)) {
      throw new Error('Unauthorized: Only Head or Chairman can create events');
    }
    const {
      title,
      description,
      date,
      location,
      speakers,
      sponsors,
      timeline,
      eventForm,
      registrationDeadline,
      maxParticipants
    } = data;

    const domainEvent = new Event(
      title,
      description,
      createdBy,
      new Date(date),
      location,
      new Map(Object.entries(speakers || {})),
      sponsors || [],
      new Map(Object.entries(timeline || {})),
      [],
      eventForm,
      new Date(registrationDeadline),
      maxParticipants
    );

    const eventDocument = {
      title: domainEvent.getTitle(),
      description: domainEvent.getDescription(),
      date: domainEvent.getDate(),
      location: domainEvent.location,
      speakers: Object.fromEntries(domainEvent.speakers),
      sponsors: domainEvent.sponsors,
      timeline: Object.fromEntries(domainEvent.timeline),
      shareableLink: domainEvent.getEventForm(), 
    };

    const savedEvent = await EventModel.create(eventDocument);
    return savedEvent;
  }
}

export default EventService;