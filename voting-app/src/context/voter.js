import React, { useState, useCallback, useContext } from "react";
import axios from "axios";
import { VotingAddress, VotingAddressABI } from "./config.js";

const { ethers } = require("ethers");
export const VotingContext = React.createContext();

export const VotingProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);

  const [error, setError] = useState("");

  const fetchContract = (signer) => {
    if (contract) return contract;
    const contractAddress = VotingAddress;
    const contractABI = VotingAddressABI;

    const votingManager = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    setContract(votingManager);
    return votingManager;
  };

  const connectWallet = async () => {
    let signer = null;
    let provider;

    if (!window.ethereum) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
      return setError("Please Install MetaMask");
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      signer = await provider.getSigner();
    }

    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    if (account.length) {
      setCurrentAccount(account);
      setSigner(signer);
      fetchContract(signer);
    } else {
      setError("Please Install MetaMask & Connect, Reload");
    }
  };

  const createVotingProposal = async (
    proposalMessage,
    endDate,
    contract,
    signer
  ) => {
    try {
      if (!contract) {
        console.log("Contract not initialized");
        return;
      }
      const contractWithSigner = contract.connect(signer);
      const proposalMessageHash = ethers.keccak256(
        ethers.toUtf8Bytes(proposalMessage)
      );
      const endDateTimestamp = Math.floor(new Date(endDate).getTime() / 1000);

      const tx = await contractWithSigner.createVotingProposal(
        proposalMessageHash,
        endDateTimestamp
      );
      await tx.wait();

      console.log("Proposal created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VotingContext.Provider
      value={{
        currentAccount,
        signer,
        connectWallet,
        createVotingProposal,
        fetchContract,
        contract,
        error,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};
