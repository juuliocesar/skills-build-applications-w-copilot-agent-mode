import { useEffect, useState } from 'react';
import { apiUrlFor, normalizeApiResponse } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState<Array<Record<string, any>>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(apiUrlFor('teams'));
        const data = await response.json();
        setTeams(normalizeApiResponse(data));
      } catch (err) {
        setError('Failed to load teams');
      }
    }

    loadTeams();
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {error && <p className="text-danger">{error}</p>}
      {teams.length === 0 ? (
        <p>No teams available.</p>
      ) : (
        <ul>
          {teams.map((team) => (
            <li key={(team as any)._id || JSON.stringify(team)}>
              {team.name} — {team.members} members
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Teams;
