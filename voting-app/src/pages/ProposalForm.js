import React, { useState, useContext } from 'react';
import { VotingContext } from '../context/voter'; 
// import { createVotingProposal } from '../components/VotingManager';

function CreateProposalForm() {
  const [message, setMessage] = useState('');
  const [endDate, setEndDate] = useState('');
  const { createVotingProposal } = useContext(VotingContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    createVotingProposal(message, endDate);
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      padding: '20px', 
      backgroundColor: '#e3f2fd', 
      borderRadius: '10px', 
      margin: '20px', 
      border: '2px solid #3f51b5', 
      width: '50%' 
    }}>
      <h2 style={{ 
        marginBottom: '20px', 
        color: '#3f51b5', 
        fontWeight: 'bold' 
      }}>Create Proposal</h2>
      <label style={{ display: 'block', marginBottom: '10px' }}>
        Proposal Message:
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      <label style={{ display: 'block', marginBottom: '10px' }}>
        End Date:
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </label>
      <button type="submit">Avanzar</button>
    </form>
  );
}

export default CreateProposalForm;