// models/Project.ts
import mongoose, { Schema, model, models, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  hoverTitle?: string; // optional
  hoverText?: string; // optional
  location: string;
  status: 'ongoing' | 'completed' | 'upcoming' | 'soldout';
  description?: string; // optional
  size: string;
  units: number;
  floors: string;
  amenities: string[];
  image: string;
  isActive: boolean; // New field for active/inactive status
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    hoverTitle: { type: String },
    hoverText: { type: String },
    location: { type: String, required: true },
    status: {
      type: String,
      enum: ['ongoing', 'completed', 'upcoming', 'soldout'],
      required: true,
    },
    description: { type: String }, // ✅ no longer required
    size: { type: String, required: true },
    units: { type: Number, required: true },
    floors: { type: String, required: true },
    amenities: { type: [String], required: true },
    image: { type: String, required: true },
    isActive: { type: Boolean, default: true }, // New field with default value
  },
  { timestamps: true }
);

export const Project =
  models.Project || model<IProject>('Project', ProjectSchema);