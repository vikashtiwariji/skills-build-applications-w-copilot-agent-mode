import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const endpoint = `${process.env.REACT_APP_API_BASE_URL}teams/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Fetched teams:', results);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [endpoint]);

  return (
    <div>
      <h2>Teams</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, idx) => (
            <tr key={team.id || idx}>
              <td>{idx + 1}</td>
              <td>{team.name}</td>
              <td>{team.created_at ? new Date(team.created_at).toLocaleString() : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teams;
