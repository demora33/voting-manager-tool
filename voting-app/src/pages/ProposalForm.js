import React, { useState, useContext } from 'react';
import { VotingContext } from '../context/voter'; 

function CreateProposalForm() {
  const [message, setMessage] = useState('');
  const [endDate, setEndDate] = useState('');
  const { createVotingProposal, signer, contract } = useContext(VotingContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    createVotingProposal(message, endDate, contract, signer);
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px', 
      backgroundColor: '#e3f2fd', 
      borderRadius: '10px', 
      margin: '30px',
      border: '2px solid #3f51b5', 
      width: '80%', 
      maxWidth: '800px' 
    }}>
      <h2 style={{ 
        marginBottom: '20px', 
        color: '#3f51b5', 
        fontWeight: 'bold' 
      }}>Create Proposal</h2>
      <label style={{ display: 'block', marginBottom: '10px', width: '100%' }}>
        Proposal Message:
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }} />
      </label>
      <label style={{ display: 'block', marginBottom: '10px', width: '100%' }}>
        End Date:
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }} />
      </label>
      <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#3f51b5', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Avanzar</button>
    </form>
  );
}

export default CreateProposalForm;