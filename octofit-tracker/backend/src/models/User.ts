import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'athlete' | 'coach' | 'admin';
  joinedAt: Date;
  team?: mongoose.Types.ObjectId;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['athlete', 'coach', 'admin'], default: 'athlete' },
  joinedAt: { type: Date, default: () => new Date() },
  team: { type: Schema.Types.ObjectId, ref: 'Team' }
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
