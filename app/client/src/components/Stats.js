import React from 'react';

const Stats = ({ Players }) => {
  return (
    <tbody>
      {Players.length === 0 ? (
        <tr>
          <td className="text-left">0</td>
          <td className="text-center">000x0</td>
          <td className="text-right">No Name</td>
          <td className="text-right">0</td>
        </tr>
      ) : (
        Players.map((player) => (
          <tr key={player.Player_ID}>
            <td className="text-left">{player.Rank}</td>
            <td className="text-center">{player.Player_ID}</td>
            <td className="text-right">{player.Player}</td>
            <td className="text-right">{player.Score}</td>
            <td className="text-right">{player.TPP}</td>
          </tr>
        ))
      )}
    </tbody>
  );
};

export default Stats;
