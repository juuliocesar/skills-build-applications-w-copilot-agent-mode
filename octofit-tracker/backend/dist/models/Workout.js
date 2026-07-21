import mongoose, { Schema } from 'mongoose';
const WorkoutSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    durationMinutes: { type: Number, required: true },
    intensity: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    targetMuscles: { type: [String], default: [] }
});
export default mongoose.models.Workout || mongoose.model('Workout', WorkoutSchema);
