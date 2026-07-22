import mongoose, { Schema } from 'mongoose';
const ActivitySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, default: () => new Date() }
});
export default mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);
