import mongoose, { Schema, Document } from 'mongoose';

export interface TrainingDocument extends Document {
  title: string;
  department: 'Analog' | 'Digital' | 'RF' | 'VLSI' | 'General';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  hours: number;
  nextStart?: Date | string;
  summary?: string;
  outcomes: string[];
  maxParticipants?: number;
  prerequisites?: string;
  instructor?: string;
  location?: string;
  materials?: string;
  createdBy?: string;
  googleForm?: {
    formId: string;
    formUrl: string;
    editUrl: string;
    isActive: boolean;
    syncEnabled: boolean;
    lastSyncAt?: Date;
  };
}

const trainingSchema = new Schema<TrainingDocument>(
  {
    title: { type: String, required: true },
    department: { type: String, enum: ['Analog', 'Digital', 'RF', 'VLSI', 'General'], required: true },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    hours: { type: Number, required: true },
    nextStart: { type: Date },
    summary: { type: String },
    outcomes: { type: [String], default: [] },
    maxParticipants: { type: Number },
    prerequisites: { type: String },
    instructor: { type: String },
    location: { type: String },
    materials: { type: String },
    createdBy: { type: String },
  },
  { timestamps: true }
);

const TrainingModel = mongoose.models.Training || mongoose.model<TrainingDocument>('Training', trainingSchema);

export default TrainingModel;


