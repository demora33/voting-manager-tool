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

  const fetchContract = useCallback(() => {
    if (contract) return contract;

    if (window.ethereum) {
      console.log("Ethereum object found");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const providerSigner = provider.getSigner();
      setSigner(providerSigner);
  
      const contractAddress = VotingAddress;
      const contractABI = VotingAddressABI;
  
      const votingManager = new ethers.Contract(
        contractAddress,
        contractABI,
        providerSigner
      );
      setContract(votingManager);
  
      return votingManager;
    }
  }, [contract]);

  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setError("Please Install MetaMask");

    const account = await window.ethereum.request({ method: "eth_accounts" });

    if (account.length) {
      setCurrentAccount(account);
    } else {
      setError("Please Install MetaMask & Connect, Reload");
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setCurrentAccount(accounts[0]);
      } catch (error) {
        setError("Failed to connect wallet");
      }
    } else {
      setError("Please install MetaMask");
    }
  };

  const createVotingProposal = async (proposalMessage, endDate) => {
    try {
      const contract = fetchContract();
      // console.log(provider);
      // console.log(providerSigner);
      // const proposalHash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(proposalMessage));

      console.log(proposalMessage, endDate);
      // console.log(proposalHash);
      console.log(contract);

      if (!contract) {
        console.log("Contract not initialized");
        return;
      }

      const tx = await contract
        .connect()
        .createVotingProposal(proposalMessage, endDate);

      // Asegúrate de que la función que estás llamando existe en tu contrato
      // await contract.nextVotingProposalId();
      // console.log(owner);

      // Espera a que la transacción sea minada
      await tx.wait();

      console.log("Proposal created successfully");
    } catch (error) {
      console.log(error);
    }
  };

  // API SUBGRAPH
  // const getAllVoterData = async () => {
  //   try {
  //     const web3Modal = new Web3Modal();
  //     const connection = await web3Modal.connect();
  //     const provider = new ethers.providers.Web3Provider(connection);
  //     const signer = provider.getSigner();
  //     const contract = fetchContract(signer);
  //     //VOTR LIST
  //     const voterListData = await contract.getVoterList();
  //     setVoterAddress(voterListData);

  //     voterListData.map(async (el) => {
  //       const singleVoterData = await contract.getVoterData(el);
  //       pushVoter.push(singleVoterData);
  //     });

  //     //VOTER LENGHT
  //     const voterList = await contract.getVoterLength();
  //     setVoterLength(voterList.toNumber());
  //   } catch (error) {
  //     console.log("All data");
  //   }
  // };

  // =============================================

  // =============================================
  ////////GIVE VOTE

  // const giveVote = async (id) => {
  //   try {
  //     const voterAddress = id.address;
  //     const voterId = id.id;
  //     const web3Modal = new Web3Modal();
  //     const connection = await web3Modal.connect();
  //     const provider = new ethers.providers.Web3Provider(connection);
  //     const signer = provider.getSigner();
  //     const contract = fetchContract(signer);

  //     const voteredList = await contract.vote(voterAddress, voterId);
  //     console.log(voteredList);
  //   } catch (error) {
  //     setError("Sorry!, You have already voted, Reload Browser");
  //   }
  // };
  // =============================================

  // const setCandidate = async (candidateForm, fileUrl, router) => {
  //   const { name, address, age } = candidateForm;

  //   if (!name || !address || !age) return console.log("Input Data is missing");

  //   const web3Modal = new Web3Modal();
  //   const connection = await web3Modal.connect();
  //   const provider = new ethers.providers.Web3Provider(connection);
  //   const signer = provider.getSigner();
  //   const contract = fetchContract(signer);

  //   const data = JSON.stringify({
  //     name,
  //     address,
  //     image: fileUrl,
  //     age,
  //   });

  //   const response = await axios({
  //     method: "POST",
  //     url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
  //     data: data,
  //     headers: {
  //       pinata_api_key: `9d03a2850c7a2c190538`,
  //       pinata_secret_api_key: `
  //     19df2cf3af00256fc86448cee4cd5796e58acb0dcd62ba86090c28aaad4efba5`,
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

  //   const candidate = await contract.setCandidate(
  //     address,
  //     age,
  //     name,
  //     fileUrl,
  //     url
  //   );
  //   candidate.wait();

  //   router.push("/");
  // };

  // const getNewCandidate = async () => {
  //   const web3Modal = new Web3Modal();
  //   const connection = await web3Modal.connect();
  //   const provider = new ethers.providers.Web3Provider(connection);
  //   const signer = provider.getSigner();
  //   const contract = fetchContract(signer);

  //   //---------ALL CANDIDATE
  //   const allCandidate = await contract.getCandidate();

  //   //--------CANDIDATE DATA
  //   allCandidate.map(async (el) => {
  //     const singleCandidateData = await contract.getCandidateData(el);

  //     pushCandidate.push(singleCandidateData);
  //     candidateIndex.push(singleCandidateData[2].toNumber());
  //   });

  //   //---------CANDIDATE LENGTH
  //   const allCandidateLength = await contract.getCandidateLength();
  //   setCandidateLength(allCandidateLength.toNumber());
  // };

  return (
    <VotingContext.Provider
      value={{
        currentAccount,
        checkIfWalletIsConnected,
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
