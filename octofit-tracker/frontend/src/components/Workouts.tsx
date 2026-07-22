import { useEffect, useState } from 'react';
import { apiUrlFor, normalizeApiResponse } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState<Array<Record<string, any>>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(apiUrlFor('workouts'));
        const data = await response.json();
        setWorkouts(normalizeApiResponse(data));
      } catch (err) {
        setError('Failed to load workouts');
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {error && <p className="text-danger">{error}</p>}
      {workouts.length === 0 ? (
        <p>No workouts available.</p>
      ) : (
        <ul>
          {workouts.map((workout) => (
            <li key={(workout as any)._id || JSON.stringify(workout)}>
              {workout.title} — {workout.durationMinutes} min — {workout.intensity}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Workouts;
