import Event from './Event';
// import Call from './Call';
// import Election from './Election';
// import Training from './Training';
import User from '../Factory/User';
import Head from '../Factory/Head';
import Chairman from '../Factory/Chairman';

function hasPermission(user: User): boolean {
  return user instanceof Head || user instanceof Chairman;
}

function withPermission<T extends (...args: any[]) => any>(
  fn: (user: User, ...args: Parameters<T>) => ReturnType<T>
): (user: User, ...args: Parameters<T>) => ReturnType<T> {
  return (user, ...args) => {
    if (!hasPermission(user)) {
       const err = new Error(`Permission denied: ${user.constructor.name} cannot perform this action`);
      err.name = 'UnauthorizedError';
      throw err;
    }
    return fn(user, ...args);
  };
}


class UserActions {
    // EVENT ACTIONS
    public createEvent = withPermission((
        user: User,
        title: string,
        description: string,
        eventStarts: Date,
        eventEnds: Date,
        location: string,
        speakers: Map<string, string> = new Map(),
        sponsors: Array<string> = [],
        participants: Array<User> = [],
        eventForm: string = '',
        registrationDeadline: Date,
        maxParticipants: number 
    ): Event => {
        const event = new Event(
            title, description, user, eventStarts, eventEnds, location, speakers, sponsors,
            participants, eventForm, registrationDeadline, maxParticipants
        );
        
        console.log(`Event "${title}" created by ${user.getName()}`);
        return event;
    });

    public editEvent = withPermission((
        user: User,
        event: Event,
        updates: Partial<{
            title: string;
            description: string;
            location: string;
            date: Date;
            registrationDeadline: Date;
            speakers: Map<string, any>;
            sponsors: Array<string>;
            maxParticipants: number;
            eventForm: any;
        }>
    ): void => {
        event.editDetails(user, updates); // Fixed: pass updates object directly
        console.log(`Event "${event.getTitle()}" edited by ${user.getName()}`);
    });

    public deleteEvent = withPermission((user: User, event: Event): boolean => {
        const result = event.deleteEvent(user);
        console.log(`Event "${event.getTitle()}" deleted by ${user.getName()}`);
        return result;
    });

    // SPEAKER ACTIONS
    public addSpeaker = withPermission((
        user: User,
        event: Event,
        name: string,
        details: string
    ): void => {
        event.addSpeaker(user, name, details);
        console.log(`Speaker "${name}" added to event "${event.getTitle}" by ${user.getName()}`);
    });

    public removeSpeaker = withPermission((
        user: User,
        event: Event,
        name: string
    ): void => {
        event.removeSpeaker(user, name);
        console.log(`Speaker "${name}" removed from event "${event.getTitle()}" by ${user.getName()}`);
    });

    // SPONSOR ACTIONS
    public addSponsor = withPermission((
        user: User,
        event: Event,
        sponsor: string
    ): void => {
        event.addSponsor(user , sponsor);
        console.log(`Sponsor "${sponsor}" added to event "${event.getTitle()}" by ${user.getName()}`);
    });

    public removeSponsor = withPermission((
        user: User,
        event: Event,
        sponsor: string
    ): void => {
        event.removeSponsor(user , sponsor);
        console.log(`Sponsor "${sponsor}" removed from event "${event.getTitle()}" by ${user.getName()}`);
    });

    // Remove TIMELINE ACTIONS (addTimelineItem, removeTimelineItem)
    public getEvents = async (): Promise<Event[]> => {
        try {
            // Assuming we have a database connection and EventModel is defined
            const events = await Event.getEvents();
            return events;
        } catch (error) {
            console.error("Error fetching events:", error);
            throw new Error("Failed to fetch events");
        }
    }
}
export default UserActions;
export { hasPermission, withPermission };