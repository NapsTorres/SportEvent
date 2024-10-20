import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Schedules = () => {
  const tabs = [
    { name: "Competitions", path: "/competitions" },
    { name: "Teams", path: "/teams" },
    { name: "Schedules", path: "/schedules" },
    { name: "Standings", path: "/standings" }
  ];

  const [Basketballschedules, setBasketballSchedules] = useState([]);
  const [Volleyballschedules, setVolleyballSchedules] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/matches/list')
      .then(response => {
        console.log('Matches List Response:', response.data);
        setBasketballSchedules(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the matches list!', error);
      });

    axios.get('http://localhost:9000/api/teams/list')
      .then(response => {
        console.log('Teams List Response:', response.data);
        setTeams(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the teams list!', error);
      });

    axios.get('http://localhost:9000/api/volleyball/list')
      .then(response => {
        console.log('Volleyball List Response:', response.data);
        setVolleyballSchedules(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the volleyball list!', error);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderTableRows = (schedules) => {
    return schedules.map((schedule, index) => (
      <tr key={index} className="border-b">
        <td className="py-2 px-4 text-xs">{formatDate(schedule.date)}</td>
        <td className="py-2 px-4 text-xs">{schedule.Team1 ? schedule.Team1.collegename : 'TBA'}</td>
        <td className="py-2 px-4 text-xs">{schedule.Team2 ? schedule.Team2.collegename : 'TBA'}</td>
        <td className="py-2 px-4 text-xs">{schedule.team1Score !== null ? schedule.team1Score : '-'}</td>
        <td className="py-2 px-4 text-xs">{schedule.team2Score !== null ? schedule.team2Score : '-'}</td>
        <td className="py-2 px-4 text-xs">{schedule.status}</td>
      </tr>
    ));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sports Competitions</h1>
        <div>
          <button
            className="bg-white text-blue-600 py-2 px-4 rounded"
            onClick={() => {
              localStorage.removeItem('isAuthenticated');
              window.location.href = '/login';
            }}
          >
            Logout
          </button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="bg-gray-100 w-64 p-4">
          <ul>
            {tabs.map((tab, index) => (
              <li key={index} className="mb-4">
                <Link to={tab.path} className="text-blue-600 font-bold">{tab.name}</Link>
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-xl font-bold mb-4">Basketball Schedules</h2>
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-xs">Date</th>
                    <th className="py-2 px-4 border-b text-xs">Team 1</th>
                    <th className="py-2 px-4 border-b text-xs">Team 2</th>
                    <th className="py-2 px-4 border-b text-xs">Score 1</th>
                    <th className="py-2 px-4 border-b text-xs">Score 2</th>
                    <th className="py-2 px-4 border-b text-xs">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {renderTableRows(Basketballschedules)}
                </tbody>
              </table>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Volleyball Schedules</h2>
              <table className="min-w-full bg-white border">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b text-xs">Date</th>
                    <th className="py-2 px-4 border-b text-xs">Team 1</th>
                    <th className="py-2 px-4 border-b text-xs">Team 2</th>
                    <th className="py-2 px-4 border-b text-xs">Score 1</th>
                    <th className="py-2 px-4 border-b text-xs">Score 2</th>
                    <th className="py-2 px-4 border-b text-xs">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {renderTableRows(Volleyballschedules)}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Schedules;
