import mongoose, { Document, Schema } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description: string;
  durationMinutes: number;
  intensity: 'low' | 'medium' | 'high';
  targetMuscles: string[];
}

const WorkoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  durationMinutes: { type: Number, required: true },
  intensity: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  targetMuscles: { type: [String], default: [] }
});

export default mongoose.models.Workout || mongoose.model<IWorkout>('Workout', WorkoutSchema);
