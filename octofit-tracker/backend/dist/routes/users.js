import { Router } from 'express';
import User from '../models/User.js';
const router = Router();
router.get('/', async (_req, res) => {
    try {
        const users = await User.find().lean();
        res.json({ users });
    }
    catch (error) {
        res.status(500).json({ error: 'Unable to fetch users' });
    }
});
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: 'User created', user });
    }
    catch (error) {
        res.status(400).json({ error: 'Unable to create user', details: error });
    }
});
export default router;
