import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['athlete', 'coach', 'admin'], default: 'athlete' },
    joinedAt: { type: Date, default: () => new Date() },
    team: { type: Schema.Types.ObjectId, ref: 'Team' }
});
export default mongoose.models.User || mongoose.model('User', UserSchema);
