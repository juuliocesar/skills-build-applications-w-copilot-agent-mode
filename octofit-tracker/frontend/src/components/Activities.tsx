import { useEffect, useState } from 'react';
import { apiUrlFor, normalizeApiResponse } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState<Array<Record<string, any>>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(apiUrlFor('activities'));
        const data = await response.json();
        setActivities(normalizeApiResponse(data));
      } catch (err) {
        setError('Failed to load activities');
      }
    }

    loadActivities();
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {error && <p className="text-danger">{error}</p>}
      {activities.length === 0 ? (
        <p>No activities available.</p>
      ) : (
        <ul>
          {activities.map((item) => (
            <li key={(item as any)._id || JSON.stringify(item)}>
              {item.type} — {item.durationMinutes} min — {item.caloriesBurned} cal
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Activities;
