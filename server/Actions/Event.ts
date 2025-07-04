
import User from'../Factory/User';
import Actions from './Actions';
import Head from '../Factory/Head';
import Chairman from '../Factory/Chairman';
import { hasPermission, withPermission } from './UserActions';

enum EventStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED'
}
class Event extends Actions {
    protected id?: string; // Optional ID for database reference
    public location: string;
    public speakers: Map<string, string>; // name, speaker details 
    public sponsors: Array<string>; // list of sponsors
    public timeline: Map<string, string>; // time, event details
    public participants: Array<User>; // list of participants
    private eventForm: string; 
    public registrationDeadline: Date;
    public maxParticipants: number;
    private status: EventStatus;

    constructor(
        title: string, 
        description: string, 
        createdBy: User, 
        date: Date, 
        location: string,
        speakers: Map<string, string>, 
        sponsors: Array<string>, 
        timeline: Map<string, string>,
        participants: Array<User>, 
        eventForm: string, 
        registrationDeadline: Date, 
        maxParticipants: number
    ) {
        super(title, description, createdBy, date);
        this.location = location;
        this.speakers = speakers;
        this.sponsors = sponsors;
        this.timeline = timeline;
        this.participants = participants;
        this.eventForm = eventForm;
        this.registrationDeadline = registrationDeadline;
        this.maxParticipants = maxParticipants;
        this.status = EventStatus.DRAFT; // Only set once
    }



    public registerParticipant(user: User): boolean {
        if (new Date() > this.registrationDeadline) {
            throw new Error("Registration deadline has passed");
        }

        // Check if event is published
        if (this.status !== EventStatus.PUBLISHED) {
            throw new Error("Cannot register for unpublished event");
        }
        
        // Check capacity
        if (this.maxParticipants && this.participants.length >= this.maxParticipants) {
            throw new Error("Event has reached maximum capacity");
        }
        
        if (this.participants.includes(user)) {
            throw new Error("User already registered for this event");
        }
        
        this.participants.push(user);
        console.log(`User ${user.getName()} successfully registered for event: ${this.title}`);
        return true;
    }

   
    public editDetails = withPermission((
        user: User,
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
      
        if (updates.title) this.title = updates.title;
        if (updates.description) this.description = updates.description;
        if (updates.location) this.location = updates.location;
        if (updates.date) this.date = updates.date;
        if (updates.registrationDeadline) this.registrationDeadline = updates.registrationDeadline;
        
       
        
        if (updates.maxParticipants) this.maxParticipants = updates.maxParticipants;
        if (updates.eventForm) this.setEventForm(updates.eventForm);
        
        console.log(`Event "${this.title}" has been updated by ${user.getName()}`);
    });

    // Fixed deleteEvent method using withPermission wrapper
    public deleteEvent = withPermission((user: User): boolean => {
        this.status = EventStatus.CANCELLED;
        
        // Notify all participants
        // observer pattern implementation can go here
        
        console.log(`Event "${this.title}" has been deleted by ${user.getName()}`);
        return true;
    });
    public addSpeaker = withPermission((user: User, name: string, details: string): void => {
        this.speakers.set(name, details);
        console.log(`Speaker "${name}" added to event "${this.title}"`);
    });

   
    public removeSpeaker = withPermission((user: User, name: string): void => {
        this.speakers.delete(name);
        console.log(`Speaker "${name}" removed from event "${this.title}"`);
    });

     public addTimelineItem = withPermission((user: User, time: string, details: string): void => {
        this.timeline.set(time, details);
        console.log(`Timeline item added at "${time}" to event "${this.title}"`);
    });

    public removeTimelineItem = withPermission((user: User, time: string): void => {
        if (this.timeline.has(time)) {
            this.timeline.delete(time);
            console.log(`Timeline item at "${time}" removed from event "${this.title}"`);
        } else {
            throw new Error(`Timeline item at "${time}" not found in event "${this.title}"`);
        }
    });


    public removeSponsor = withPermission((user: User, sponsor: string): void => {
        const index = this.sponsors.indexOf(sponsor);
        if (index > -1) {
            this.sponsors.splice(index, 1);
            console.log(`Sponsor "${sponsor}" removed from event "${this.title}"`);
        } else {
            throw new Error(`Sponsor "${sponsor}" not found in event "${this.title}"`);
        }
    });
    public addSponsor = withPermission((user: User, sponsor: string): void => {
        if (!this.sponsors.includes(sponsor)) {
            this.sponsors.push(sponsor);
            console.log(`Sponsor "${sponsor}" added to event "${this.title}"`);
        } else {
            throw new Error(`Sponsor "${sponsor}" already exists in event "${this.title}"`);
        }
    });

    public setEventForm(form: string): void {
        this.eventForm = form;
    }

    public getEventForm(): string {
        return this.eventForm;
    }

   
    public getStatus(): EventStatus {
        return this.status;
    }

    public getParticipants(): Array<User> {
        return [...this.participants]; // Return a copy to prevent direct manipulation
    }
    public getId() : string | undefined {
        return this.id;
    }
    static fromDocument(doc: any): Event {
    // Helper to filter out Mongoose internal keys
    const filterMap = (obj: any) =>
        Object.entries(obj || {})
            .filter(([key]) => !key.startsWith('$'))
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {} as Record<string, any>);

    const event = new Event(
        doc.title,
        doc.description,
        doc.createdBy,
        new Date(doc.date),
        doc.location,
        new Map(Object.entries(filterMap(doc.speakers))),
        doc.sponsors || [],
        new Map(Object.entries(filterMap(doc.timeline))),
        doc.participants || [],
        doc.eventForm,
        new Date(doc.registrationDeadline),
        doc.maxParticipants
    );
    event.id = doc._id?.toString();
    return event;
}
}

export default Event;