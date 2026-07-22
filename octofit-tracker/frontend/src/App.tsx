import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { VITE_CODESPACE_NAME } from './utils/api';

function App() {
  const codespaceNotice = VITE_CODESPACE_NAME
    ? `Codespaces API enabled for ${VITE_CODESPACE_NAME}`
    : 'Define VITE_CODESPACE_NAME in .env.local to enable Codespaces API URLs.';

  return (
    <Container className="py-4">
      <header className="mb-4">
        <h1>OctoFit Tracker</h1>
        <p className="lead">
          Modern multi-tier fitness tracking with React, Vite, Express, and MongoDB.
        </p>
      </header>

      <Navbar bg="light" expand="lg" className="mb-4 rounded">
        <Navbar.Toggle aria-controls="octofit-navbar" />
        <Navbar.Collapse id="octofit-navbar">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/users">
              Users
            </Nav.Link>
            <Nav.Link as={NavLink} to="/activities">
              Activities
            </Nav.Link>
            <Nav.Link as={NavLink} to="/teams">
              Teams
            </Nav.Link>
            <Nav.Link as={NavLink} to="/leaderboard">
              Leaderboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/workouts">
              Workouts
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="mb-3 text-muted">
        {codespaceNotice}
      </div>

      <Routes>
        <Route path="/" element={<Navigate replace to="/users" />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </Container>
  );
}

export default App;
