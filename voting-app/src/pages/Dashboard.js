import React, { useContext, useState, useEffect } from "react";
import Proposal from "./Proposal";
import apiClient from '../api';

console.log(apiClient);

function Dashboard() {

  const [votingProposals, setVotingProposals] = useState([]);

  useEffect(() => {
    apiClient.get('/proposal')
      .then(response => {
        console.log("---------------------------")
        console.log(response.data);
        const notConcludedProposals = response.data.filter(proposal => !proposal.isConcluded);
        notConcludedProposals.sort((a, b) => b.votingProposalId - a.votingProposalId); // Ordenar por votingProposalId en orden descendente
        setVotingProposals(notConcludedProposals);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#e3f2fd",
        borderRadius: "10px",
        margin: "20px",
        border: "2px solid #3f51b5",
      }}
    >
      <h1
        style={{
          marginBottom: "20px",
          color: "#3f51b5",
          fontWeight: "bold",
        }}
      >
        Dashboard
      </h1>
      {votingProposals.map((proposal) => (
        <div key={proposal._id} style={{ marginBottom: "20px" }}>
          <Proposal
            hash={proposal.message}
            totalYes={proposal.yesVotes}
            totalNo={proposal.noVotes}
            timeRemaining={proposal.conclusionDate}
            votingProposalId={proposal.votingProposalId}
          />
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
