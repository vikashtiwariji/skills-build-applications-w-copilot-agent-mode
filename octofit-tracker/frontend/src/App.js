

import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="logo-left">
            <img src={process.env.PUBLIC_URL + '/octofitapp-small.svg'} alt="Octofit Logo" className="navbar-logo" />
          </div>
          <div className="navbar-links">
            <Link className="navbar-link" to="/activities">Activities</Link>
            <Link className="navbar-link" to="/workouts">Workouts</Link>
            <Link className="navbar-link" to="/teams">Teams</Link>
            <Link className="navbar-link" to="/leaderboard">Leaderboard</Link>
            <Link className="navbar-link" to="/users">Users</Link>
          </div>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/" element={<h2>Welcome to Octofit Tracker!</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
