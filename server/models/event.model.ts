import mongoose, { Schema, Document } from 'mongoose';

export interface EventDocument extends Document {
  date: Date;
  description: string;
  title: string;
  speakers: Map<string , string>;
  sponsors: string[];
  location: string;
  timeline: Map<string , string>;         //detailed schedule of the event
  shareableLink: string;
}

const eventSchema = new Schema<EventDocument>(
  {
    date: { type: Date, required: true },
    description: { type: String, required: true },
    title: { type: String, required: true },
    speakers: { type: Map, of: String, default: {} },
    sponsors: { type: [String], default: [] },
    location: { type: String, required: true },
    timeline: { type: Map, of: String, default: {} },
    shareableLink: { type: String }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const EventModel = mongoose.model<EventDocument>('Event', eventSchema);
export default EventModel;