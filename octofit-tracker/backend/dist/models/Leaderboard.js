import mongoose, { Schema } from 'mongoose';
const LeaderboardSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rank: { type: Number, required: true },
    score: { type: Number, required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' }
});
export default mongoose.models.Leaderboard || mongoose.model('Leaderboard', LeaderboardSchema);
