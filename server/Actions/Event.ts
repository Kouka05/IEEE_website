import { set } from 'mongoose';
import User from'../Factory/User';
import Actions from './Actions';
import Head from '../Factory/Head';
import Chairman from '../Factory/Chairman';
import { throws } from 'assert';
enum EventStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED'
}
class Event extends Actions{
     public location: string;
     public speakers :Map<string , string>  ; // name , speaker details 
     public sponsors :Array<string>; // list of sponsors
     public timeline :Map<string , string>; // time , event details
    public participants :Array<User>; // list of participants
    private eventForm : string; 
    public registrationDeadline : Date
    public maxParticipants : number;
    private  status: EventStatus;
    constructor (title: string, description: string, createdBy: User, date: Date , location: string,
         speakers: Map<string, string>, sponsors: Array<string>, timeline: Map<string, string>,
          participants: Array<User>, eventForm: string , registrationDeadline: Date , maxParticipants: number
          

    ) {
        super(title, description, createdBy, date);
        this.location = location;
        this.speakers = speakers;
        this.sponsors = sponsors;
        this.timeline = timeline;
        this.participants = participants;
        this.eventForm = eventForm;
        this.registrationDeadline = registrationDeadline;
        this.status = EventStatus.DRAFT;
        this.maxParticipants = maxParticipants;
        this.status = EventStatus.DRAFT;
    }
       private canManageEvent(user: User): boolean {
        if (user instanceof Head || user instanceof Chairman) {
            return true;
        }
        else
         return false;
    }
    public publish():void{


    }
    public registerParticipant(user: User): boolean {
         if (new Date() > this.registrationDeadline) {
            throw new Error("Registration deadline has passed");
            return false;
        }

        // Check if event is published
        if (this.status !== EventStatus.PUBLISHED) {
            throw new Error("Cannot register for unpublished event");
            return false;
        }
        
        // Check capacity
        if (this.maxParticipants && this.participants.length >= this.maxParticipants) {
            throw new Error("Event has reached maximum capacity");
            return false;
        }
        if(this.participants.includes(user)){
            throw new Error("User already registered for this event");
            return false;
        }
        this.participants.push(user);
        console.log(`User ${user.getName()} successfully registered for event: ${this.title}`);
        return true;
}
    //optional and partial, not a full Event object.
  public editDetails(
    editedBy: User, 
    title?: string,
    description?: string,
    location?: string,
    date?: Date,
    registrationDeadline?: Date,
    speakers?: Map<string, any>,
    sponsors?: Array<string>,
    maxParticipants?: number,
    eventForm?: any
): void {
    if (!this.canManageEvent(editedBy)) {
        throw new Error("Unauthorized: Only event creators or managers can edit events");
    }
    
    // Update allowed properties
    if (title) this.title = title;
    if (description) this.description = description;
    if (location) this.location = location;
    if (date) this.date = date;
    if (registrationDeadline) this.registrationDeadline = registrationDeadline;
    
    if (speakers) {
        speakers.forEach((details, name) => {
            this.addSpeaker(name, details);
        });
    }
    
    if (sponsors) {
        sponsors.forEach(sponsor => {
            this.addSponsor(sponsor);
        });
    }
    
    if (maxParticipants) this.maxParticipants = maxParticipants;
    if (eventForm) this.setEventForm(eventForm);
    
    console.log(`Event "${this.title}" has been updated by ${editedBy.getName()}`);
}
     public deleteEvent(deletedBy: User): boolean {
        if (!this.canManageEvent(deletedBy)) {
            throw new Error("Unauthorized: Only event creators or managers can delete events");
        }
        
        this.status = EventStatus.CANCELLED;
        
        // Notify all participants
        // observer 

        console.log(`Event "${this.title}" has been deleted by ${deletedBy.getName()}`);
        return true;
    }
    public addSpeaker(name: string, details: string): void {
         this.speakers.set(name, details);
        console.log(`Speaker "${name}" added to event "${this.title}"`);
      
    }
    public removeSpeaker(name: string , user:User): void {
        if(!this.canManageEvent(user)){
            throw new Error("Unauthorized: Only event creators or managers can remove speakers");
        }
        else
         this.speakers.delete(name);
    }
    public addSponsor(sponsor: string): void {
        this.sponsors.push(sponsor);
    }
   
    public setEventForm(form: string): void {
        this.eventForm = form;
    } 
    public getEventForm(): string {
        return this.eventForm;
    }
 
}
export default Event;