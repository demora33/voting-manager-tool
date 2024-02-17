import React, { useContext, useState, useEffect } from "react";
import Proposal from "./Proposal";
import apiClient from '../api';

console.log(apiClient);

function Dashboard() {
  // const { votingProposals } = useContext(VotingContext);

  // const votingProposals = [
  //   {
  //     hash: "0x123",
  //     totalYes: 100,
  //     totalNo: 50,
  //     timeRemaining: "2 days",
  //   },
  //   {
  //     hash: "0x456",
  //     totalYes: 200,
  //     totalNo: 100,
  //     timeRemaining: "3 days",
  //   },
  //   {
  //     hash: "0x789",
  //     totalYes: 150,
  //     totalNo: 75,
  //     timeRemaining: "1 day",
  //   },
  // ];
  const [votingProposals, setVotingProposals] = useState([]);

  useEffect(() => {
    apiClient.get('/proposal')
      .then(response => {
        console.log("---------------------------")
        console.log(response.data); // debería imprimir "hola"
        // Aquí puedes establecer los datos en el estado local con setVotingProposals
        // Por ejemplo:
        // setVotingProposals(response.data);
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
      {/* {votingProposals.map((proposal) => (
        <div key={proposal.hash} style={{ marginBottom: "20px" }}>
          <Proposal
            hash={proposal.hash}
            totalYes={proposal.totalYes}
            totalNo={proposal.totalNo}
            timeRemaining={proposal.timeRemaining}
          />
        </div>
      ))} */}
    </div>
  );
}

export default Dashboard;
