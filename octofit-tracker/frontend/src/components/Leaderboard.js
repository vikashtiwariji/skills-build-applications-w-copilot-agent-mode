import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const endpoint = `${process.env.REACT_APP_API_BASE_URL}leaderboard/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
        console.log('Fetched leaderboard:', results);
      })
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, [endpoint]);

  return (
    <div>
      <h2>Leaderboard</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>Points</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {leaders.map((leader, idx) => (
            <tr key={leader.id || idx}>
              <td>{idx + 1}</td>
              <td>{leader.team}</td>
              <td>{leader.points}</td>
              <td>{leader.updated_at ? new Date(leader.updated_at).toLocaleString() : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
