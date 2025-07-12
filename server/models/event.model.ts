import mongoose, { Document, Schema } from 'mongoose';

// Define the EventStatus enum to match your class
enum EventStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED'
}

// Enhanced interface with Google Forms integration
export interface EventDocument extends Document {
    // From Actions base class
    title: string;
    description: string;
    createdBy: mongoose.Types.ObjectId;
    date: Date;
    
    // Event-specific fields
    location: string;
    speakers: Array<{
        name: string;
        details: string;
    }>;
    sponsors: Array<string>;
    timeline: Array<{
        time: string;
        details: string;
    }>;
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }];
    eventForm: string;
    registrationDeadline: Date;
    maxParticipants: number;
    status: EventStatus;
    shareableLink?: string;
    
    // Google Forms integration fields
    googleForm?: {
        formId: string;
        formUrl: string;
        editUrl: string;
        isActive: boolean;
        syncEnabled: boolean;
        lastSyncAt?: Date;
       
    };
    
    // Auto-registration settings
    autoRegistration?: {
        enabled: boolean;
        emailFieldName?: string; // Which form field contains email
        nameFieldName?: string;  // Which form field contains name
        requireUserAccount: boolean; // Whether to require existing user account
    };
    availableSpots: number; // Virtual field for available spots
}

// Enhanced schema with Google Forms integration
const eventSchema = new Schema<EventDocument>(
    {
        // From Actions base class
        title: { type: String, required: true },
        description: { type: String, required: true },
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        date: { type: Date, required: true },
        
        // Event-specific fields
        location: { type: String, required: true },
        speakers: [{
            name: { type: String, required: true },
            details: { type: String, required: true }
        }],
        sponsors: [{ type: String }],
        timeline: [{
            time: { type: String, required: true },
            details: { type: String, required: true }
        }],
        participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        eventForm: { type: String, required: false },
        registrationDeadline: { type: Date, required: true },
        maxParticipants: { type: Number, required: true },
        status: {
            type: String,
            enum: Object.values(EventStatus),
            default: EventStatus.DRAFT
        },
        shareableLink: { type: String },
        
        // Google Forms integration
        googleForm: {
            formId: { type: String },
            formUrl: { type: String },
            editUrl: { type: String },
            isActive: { type: Boolean, default: false },
            syncEnabled: { type: Boolean, default: true },
            lastSyncAt: { type: Date },
            participantCount: { type: Number, default: 0 }
        },
        
        // Auto-registration settings
        autoRegistration: {
            enabled: { type: Boolean, default: false },
            emailFieldName: { type: String },
            nameFieldName: { type: String },
            requireUserAccount: { type: Boolean, default: true }
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Add virtual for total participant count (database + form)


// Add virtual for available spots
eventSchema.virtual('availableSpots').get(function() {
    return Math.max(0, this.maxParticipants - this.participants.length);
});

// Add virtual for registration status
eventSchema.virtual('registrationStatus').get(function() {
    const now = new Date();
    const isBeforeDeadline = now <= this.registrationDeadline;
    const hasSpots = this.availableSpots > 0;
    const isPublished = this.status === EventStatus.PUBLISHED;
    
    if (!isPublished) return 'NOT_OPEN';
    if (!isBeforeDeadline) return 'CLOSED';
    if (!hasSpots) return 'FULL';
    return 'OPEN';
});

const EventModel = mongoose.model<EventDocument>('Event', eventSchema);
export default EventModel;