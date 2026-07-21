import { Router } from 'express';
import Leaderboard from '../models/Leaderboard.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ rank: 1 })
      .populate('user', 'name email')
      .populate('team', 'name')
      .lean();

    res.json({ leaderboard });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch leaderboard' });
  }
});

export default router;
