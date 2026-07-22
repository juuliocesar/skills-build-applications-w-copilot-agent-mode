import { Router } from 'express';
import Workout from '../models/Workout.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find().lean();
    res.json({ workouts });
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch workouts' });
  }
});

router.post('/', async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json({ message: 'Workout created', workout });
  } catch (error) {
    res.status(400).json({ error: 'Unable to create workout', details: error });
  }
});

export default router;
