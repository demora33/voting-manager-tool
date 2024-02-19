import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { VotingContext } from '../context/voter';
import moment from 'moment';

function Proposal({ hash, votingProposalId, totalYes, totalNo, timeRemaining }) {
  const { contract, signer } = useContext(VotingContext);
  const [conclusionDate, setConclusionDate] = useState('');

  useEffect(() => {
    const end = moment.unix(timeRemaining);
    setConclusionDate(end.format('DD/MM/YYYY HH:mm')); 
  }, [timeRemaining]);

  const handleVote = async (votingProposalId, voteType) => {
    if (!contract || !signer) return;
    const contractWithSigner = contract.connect(signer);
    if (voteType === 'yes') {
      console.log("votingProposalId", votingProposalId);
      await contractWithSigner.castVote(votingProposalId, 0);
    } else if (voteType === 'no') {
      await contractWithSigner.castVote(votingProposalId, 1);
    }
  };

  const handleConcludeProposal = async (votingProposalId) => {
    if (!contract || !signer) return;
    const contractWithSigner = contract.connect(signer);
    await contractWithSigner.concludeVoting(votingProposalId);
  };

  return (
    <div style={{
      backgroundColor: '#f5f5f5',
      color: '#333',
      padding: '20px',
      borderRadius: '10px',
      maxWidth: '600px',
      margin: '20px auto',
      boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
    }}>
      <p style={{ 
        borderBottom: '1px solid #ddd', 
        paddingBottom: '10px',
        overflowWrap: 'break-word'
      }}>
        Voting Proposal ID: {votingProposalId}
      </p>
      <p style={{ 
        borderBottom: '1px solid #ddd', 
        paddingBottom: '10px',
        overflowWrap: 'break-word'
      }}>
        Proposal Hash: {hash}
      </p>
      <p>Total Votes Yes: {totalYes}</p>
      <p>Total Votes No: {totalNo}</p>
      <p>Conclusion Date: {conclusionDate}</p>
      <div style={{
        backgroundColor: '#333',
        padding: '10px',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '400px',
        margin: '20px auto'
      }}>
        <button onClick={() => handleVote(votingProposalId, 'yes')} style={{
          backgroundColor: '#4caf50',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
        }}>Yes</button>
        <button onClick={() => handleVote(votingProposalId, 'no')} style={{
          backgroundColor: '#f44336',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
        }}>No</button>
        <button onClick={() => handleConcludeProposal(votingProposalId)} style={{
          backgroundColor: '#3f51b5',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
        }}>Conclude Proposal</button>
      </div>
    </div>
  );
}

export default Proposal;