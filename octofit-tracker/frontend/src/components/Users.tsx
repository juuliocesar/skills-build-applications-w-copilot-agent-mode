import { useEffect, useState } from 'react';
import { apiUrlFor, normalizeApiResponse } from '../utils/api';

function Users() {
  const [users, setUsers] = useState<Array<Record<string, any>>>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(apiUrlFor('users'));
        const data = await response.json();
        setUsers(normalizeApiResponse(data));
      } catch (err) {
        setError('Failed to load users');
      }
    }

    loadUsers();
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {error && <p className="text-danger">{error}</p>}
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={(user as any)._id || JSON.stringify(user)}>
              {user.name} <small>({user.role})</small>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Users;
