import React from 'react';

function Proposal({ hash, totalYes, totalNo, timeRemaining }) {
  return (
    <div style={{
      backgroundColor: '#333',
      color: '#fff',
      padding: '20px',
      borderRadius: '5px',
      maxWidth: '600px',
      margin: '20px auto'
    }}>
      <h2 style={{ 
  borderBottom: '1px solid #444', 
  paddingBottom: '10px',
  overflowWrap: 'break-word'
}}>
  Proposal Hash: {hash}
</h2>
      <p>Total Votes Yes: {totalYes}</p>
      <p>Total Votes No: {totalNo}</p>
      <p>Time Remaining: {timeRemaining}</p>
      <button style={{
        backgroundColor: '#555',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        margin: '10px 0',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>Yes</button>
      <button style={{
        backgroundColor: '#555',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        margin: '10px 0',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>No</button>
      <button style={{
        backgroundColor: '#555',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        margin: '10px 0',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>Conclude Proposal</button>
    </div>
  );
}

export default Proposal;