import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const teams = await Team.create([
      { name: 'OctoFit Champions', description: 'Competitive fitness team', members: 10 },
      { name: 'Cardio Crushers', description: 'High-energy runners and cyclists', members: 8 }
    ]);

    const users = await User.create([
      { name: 'Avery Morgan', email: 'avery@octofit.com', role: 'athlete', team: teams[0]._id },
      { name: 'Jordan Lee', email: 'jordan@octofit.com', role: 'coach', team: teams[0]._id },
      { name: 'Taylor Brooks', email: 'taylor@octofit.com', role: 'athlete', team: teams[1]._id }
    ]);

    const workouts = await Workout.create([
      {
        title: 'Full Body Strength',
        description: 'A balanced strength routine for upper and lower body.',
        durationMinutes: 50,
        intensity: 'high',
        targetMuscles: ['legs', 'back', 'core']
      },
      {
        title: 'HIIT Cardio Blast',
        description: 'Short intervals to spike your heart rate and improve endurance.',
        durationMinutes: 30,
        intensity: 'high',
        targetMuscles: ['cardio', 'legs']
      }
    ]);

    const activities = await Activity.create([
      {
        user: users[0]._id,
        type: 'running',
        durationMinutes: 45,
        caloriesBurned: 420,
        date: new Date()
      },
      {
        user: users[2]._id,
        type: 'cycling',
        durationMinutes: 60,
        caloriesBurned: 520,
        date: new Date(Date.now() - 24 * 60 * 60 * 1000)
      }
    ]);

    const leaderboardEntries = await Leaderboard.create([
      { user: users[0]._id, rank: 1, score: 1540, team: teams[0]._id },
      { user: users[2]._id, rank: 2, score: 1480, team: teams[1]._id }
    ]);

    console.log(`Created ${users.length} users, ${teams.length} teams, ${workouts.length} workouts, ${activities.length} activities, ${leaderboardEntries.length} leaderboard entries.`);
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
