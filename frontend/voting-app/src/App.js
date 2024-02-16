import React, { useContext, useEffect } from "react";
import { VotingContext, VotingProvider } from "./context/Voter";
import NavBar from "./components/NavBar/NavBar";
import Countdown from "react-countdown";
import Style from "./styles/index.module.css";
import Card from "./components/card/card";
import Dashboard from "./pages/Dashboard";
import CreateProposalForm from "./pages/ProposalForm";

function MyApp({}) {
  const votingContext = useContext(VotingContext);
  const { currentAccount, checkIfWalletIsConnected } = votingContext;
  useEffect(() => {
    // getNewCandidate();
    checkIfWalletIsConnected();
    console.log(currentAccount);
  }, []);

  return (
    <VotingProvider>
      <div>
        <NavBar />
        <h1
          style={{
            textAlign: "left",
            fontSize: "2em",
            fontWeight: "bold",
            color: "#3f51b5",
            marginLeft: "10px",
          }}
        >
          Voting Manager Tool by Alfonso de Mora
        </h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "45%", padding: "10px" }}>{currentAccount && <Dashboard />}</div>
          <div
            style={{
              width: "45%",
              display: "flex",
              // justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "100vh",
              top: "10px",
            }}
          >
            <CreateProposalForm />
          </div>
        </div>
      </div>
    </VotingProvider>
  );
}

export default MyApp;