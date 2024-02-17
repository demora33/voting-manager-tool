import React from 'react';

function Proposal({ hash, totalYes, totalNo, timeRemaining }) {
  return (
    <div>
      <h2>Proposal Hash: {hash}</h2>
      <p>Total Votes Yes: {totalYes}</p>
      <p>Total Votes No: {totalNo}</p>
      <p>Time Remaining: {timeRemaining}</p>
      <button>Votar Sí</button>
      <button>Votar No</button>
      <button>Concluir Propuesta</button>
    </div>
  );
}

export default Proposal;