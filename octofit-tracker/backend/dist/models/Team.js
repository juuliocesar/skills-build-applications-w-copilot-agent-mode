import mongoose, { Schema } from 'mongoose';
const TeamSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    members: { type: Number, default: 0 }
});
export default mongoose.models.Team || mongoose.model('Team', TeamSchema);
