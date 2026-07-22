import { useEffect, useState } from 'react';
import { apiUrlFor, normalizeApiResponse } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState<Array<Record<string, any>>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(apiUrlFor('leaderboard'));
        const data = await response.json();
        setEntries(normalizeApiResponse(data));
      } catch (err) {
        setError('Failed to load leaderboard');
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error && <p className="text-danger">{error}</p>}
      {entries.length === 0 ? (
        <p>No leaderboard entries available.</p>
      ) : (
        <ol>
          {entries.map((entry) => (
            <li key={(entry as any)._id || JSON.stringify(entry)}>
              {entry.rank}. {entry.user?.name || 'Unknown'} — {entry.score} points
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default Leaderboard;
