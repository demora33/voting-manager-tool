import React, { useState } from "react";
import { ethers } from "ethers";
import axios from "axios";

//INTERNAL IMPORT
import { VotingAddress, VotingAddressABI } from "./constants";

// const fetchContract = (signerOrProvider) =>
//   new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider);

export const VotingContext = React.createContext();

export const VotingProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [error, setError] = useState("");

  // const [candidateLength, setCandidateLength] = useState("");
  // const pushCandidate = [];
  // const candidateIndex = [];
  // const [candidateArray, setCandidateArray] = useState(pushCandidate);
  // =========================================================
  //---ERROR Message
  // const higestVote = [];

  // const pushVoter = [];
  // const [voterArray, setVoterArray] = useState(pushVoter);
  // const [voterLength, setVoterLength] = useState("");
  // const [voterAddress, setVoterAddress] = useState([]);

  console.log("VotingProvider");
  /// CONNECTING METAMASK
  const checkIfWalletIsConnected = async () => {
    if (!window.ethereum) return setError("Please Install MetaMask");

    const account = await window.ethereum.request({ method: "eth_accounts" });

    if (account.length) {
      setCurrentAccount(account);
      // getAllVoterData();
      // getNewCandidate();
    } else {
      setError("Please Install MetaMask & Connect, Reload");
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setCurrentAccount(accounts[0]);
      } catch (error) {
        setError("Failed to connect wallet");
      }
    } else {
      setError("Please install MetaMask");
    }
  };

  // =============================================
  //CREATE VOTER----------------------
  const createVoter = async (formInput, fileUrl) => {
    try {
      // const { name, address, position } = formInput;

      // if (!name || !address || !position)
      //   return console.log("Input Data is missing");

      // const provider = new ethers.providers.Web3Provider(connection);
      // const signer = provider.getSigner();
      // const contract = fetchContract(signer);

      // const voter = await contract.voterRight(address, name, url, fileUrl);
      // voter.wait();

      // router.push("/voterList");
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
        // createVoter,
        // setCandidate,
        // getNewCandidate,
        // giveVote,
        // getAllVoterData,
        // pushCandidate,
        // candidateArray,
        // uploadToIPFS,
        // uploadToIPFSCandidate,
        // voterArray,
        // giveVote,
        error,
        // candidateLength,
        // voterLength,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};
