import { Router } from 'express';
import Activity from '../models/Activity.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find().populate('user', 'name email').lean();
    res.json({ activities });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch activities' });
  }
});

router.post('/', async (req, res) => {
  try {
    const activity = await Activity.create(req.body);
    res.status(201).json({ message: 'Activity logged', activity });
  } catch (error) {
    res.status(400).json({ error: 'Unable to create activity', details: error });
  }
});

export default router;
