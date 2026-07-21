import mongoose, { Document, Schema } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  members: number;
}

const TeamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  members: { type: Number, default: 0 }
});

export default mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema);
