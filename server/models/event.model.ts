import mongoose, { Schema, Document, Types } from 'mongoose';

export enum EventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export interface EventDocument extends Document {
  date: Date;
  description: string;
  title: string;
  speakers: Map<string , string>;
  sponsors: string[];
  location: string;
  eventStarts: Date;
  eventEnds: Date;
  participants: Types.ObjectId[];
  eventForm: string; // Google Form link
  registrationDeadline: Date;
  maxParticipants: number;
  status: EventStatus;
  createdBy: Types.ObjectId;
}

const eventSchema = new Schema<EventDocument>(
  {
    date: { type: Date, required: true },
    description: { type: String, required: true },
    title: { type: String, required: true },
    speakers: { type: Map, of: String, default: {} },
    sponsors: { type: [String], default: [] },
    location: { type: String, required: true },
    eventStarts: { type: Date, required: true },
    eventEnds: { type: Date, required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    eventForm: { type: String, default: '' }, // Google Form link
    registrationDeadline: { type: Date },
    maxParticipants: { type: Number },
    status: { type: String, enum: Object.values(EventStatus), default: EventStatus.DRAFT },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const EventModel = mongoose.model<EventDocument>('Event', eventSchema);
export default EventModel;