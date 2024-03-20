import { ethers, upgrades } from "hardhat";
import { Contract } from "ethers";
import { expect } from "chai";
import { getCurrentBlock, mineSomeBlocks } from "./utils";


describe("VotingManager", function () {
    let votingManagerInstance: any;
    let owner: any;
    let addr1: any;
    let addr2: any;
    let addr3: any;

    let proposalHash: string;
    let nextVotingProposalId: number = 0;

    const Vote = { YES: 0, NO: 1 };

    before(async () => {
        const VotingManager = await ethers.getContractFactory("VotingManager");
        [owner, addr1, addr2, addr3 ] = await ethers.getSigners();

        console.log("Deploying VotingManager...");
        console.log(`Deployer address: ${owner.address}`);

        let votingManager: Contract = await upgrades.deployProxy(VotingManager, [], {
            initializer: "initialize",
            kind: "transparent",
        });

        const votingManagerAddress = await votingManager.getAddress();
        console.log("VotingManager deployed to:", votingManagerAddress);

        const votingManagerImplementation: string = await upgrades.erc1967.getImplementationAddress(votingManagerAddress);    
        console.log(`VotingManager implementation: ${votingManagerImplementation}`);

        votingManagerInstance = await ethers.getContractAt("VotingManager", votingManagerAddress);
        const contractOwner = await votingManager.owner();

        console.log(`Owner of the contract: ${contractOwner}`);
        console.log(`Deployer of the contract: ${owner.address}`);

        if (contractOwner === owner.address) {
            console.log("The owner of the contract is the same as the deployer.");
        } else {
            console.log("The owner of the contract is not the same as the deployer.");
        }

        console.log(`---------------------------------------------------`);

    });

    describe("Creation of voting proposals", function () {
        it("Addr1 should create a new voting proposal", async function () {
            proposalHash = ethers.keccak256(ethers.toUtf8Bytes("Proposal 1"));
            
            const endDate = Math.floor(Date.now() / 1000) + 2629743; // 1 month from now
            
            await votingManagerInstance.connect(addr1).createVotingProposal(proposalHash, endDate);

            console.log(`Proposal created by: ${addr1.address}`);
            console.log(`Proposal hash: ${proposalHash}`);


            const proposal = await votingManagerInstance.getProposal(nextVotingProposalId);
            expect(proposal.votingProposalId).to.equal(nextVotingProposalId);
            expect(proposal.totalVotes).to.equal(0);
            expect(proposal.creator).to.equal(addr1.address);
            expect(proposal.proposalHash).to.equal(proposalHash);
            expect(proposal.concluded).to.equal(false);

            nextVotingProposalId++;

            console.log(`---------------------------------------------------`);

        });

        it("Addr1 should create another voting proposal", async function () {
            proposalHash = ethers.keccak256(ethers.toUtf8Bytes("Proposal 2"));
            console.log(`Proposal created by: ${addr1.address}`);
            console.log(`Proposal hash: ${proposalHash}`);
            const endDate = Math.floor(Date.now() / 1000) + 2629743; // 1 month from now
            
            await votingManagerInstance.connect(addr1).createVotingProposal(proposalHash, endDate);

            const proposal = await votingManagerInstance.getProposal(nextVotingProposalId);
            expect(proposal.votingProposalId).to.equal(nextVotingProposalId);
            expect(proposal.totalVotes).to.equal(0);
            expect(proposal.creator).to.equal(addr1.address);
            expect(proposal.proposalHash).to.equal(proposalHash);
            expect(proposal.concluded).to.equal(false);

            nextVotingProposalId++;

            console.log(`---------------------------------------------------`);


        });

        it("Addr2 should create a new voting proposal", async function () {
            proposalHash = ethers.keccak256(ethers.toUtf8Bytes("Proposal 3"));
            
            const endDate = Math.floor(Date.now() / 1000) + 2629743; // 1 month from now
            
            await votingManagerInstance.connect(addr2).createVotingProposal(proposalHash, endDate);

            console.log(`Proposal created by: ${addr2.address}`);
            console.log(`Proposal hash: ${proposalHash}`);


            const proposal = await votingManagerInstance.getProposal(nextVotingProposalId);
            expect(proposal.votingProposalId).to.equal(nextVotingProposalId);
            expect(proposal.totalVotes).to.equal(0);
            expect(proposal.creator).to.equal(addr2.address);
            expect(proposal.proposalHash).to.equal(proposalHash);
            expect(proposal.concluded).to.equal(false);

            nextVotingProposalId++;

            console.log(`---------------------------------------------------`);

        });

        it("Addr2 should create another voting proposal", async function () {
            proposalHash = ethers.keccak256(ethers.toUtf8Bytes("Proposal 2"));
            console.log(`Proposal created by: ${addr2.address}`);
            console.log(`Proposal hash: ${proposalHash}`);

            const endDate = Math.floor(Date.now() / 1000) + 2629743; // 1 month from now
            
            await votingManagerInstance.connect(addr2).createVotingProposal(proposalHash, endDate);

            const proposal = await votingManagerInstance.getProposal(nextVotingProposalId);
            expect(proposal.votingProposalId).to.equal(nextVotingProposalId);
            expect(proposal.totalVotes).to.equal(0);
            expect(proposal.creator).to.equal(addr2.address);
            expect(proposal.proposalHash).to.equal(proposalHash);
            expect(proposal.concluded).to.equal(false);

            nextVotingProposalId++;

            console.log(`---------------------------------------------------`);


        });
    });

    describe("Vote casting", function () {
        it("Addr2 should cast a vote in a proposal 0", async function () {
            const proposalId = 0;

            let hasVoted = await votingManagerInstance.hasVoted(proposalId, addr2.address);
            let proposal = await votingManagerInstance.getProposal(proposalId);
            
            expect(hasVoted).to.equal(false);
            expect(proposal.totalVotes).to.equal(0);
            expect(proposal.concluded).to.equal(false);

            await votingManagerInstance.connect(addr2).castVote(proposalId, Vote.YES);

            hasVoted = await votingManagerInstance.hasVoted(proposalId, addr2.address);
            proposal = await votingManagerInstance.getProposal(proposalId);

            expect(proposal.totalVotes).to.equal(1);
            expect(proposal.concluded).to.equal(false);
            expect(hasVoted).to.equal(true);

            const votes = await votingManagerInstance.getVotes(proposalId);
            const yesVotes = votes[0];
            const noVotes = votes[1];

            console.log(`Yes votes: ${yesVotes.toString()}, No votes: ${noVotes.toString()}`);

            expect(yesVotes).to.equal(1);
            expect(noVotes).to.equal(0);


        });

        it("Addr3 should cast a vote in proposal 0", async function () {
            const proposalId = 0;

            let hasVoted = await votingManagerInstance.hasVoted(proposalId, addr3.address);
            let proposal = await votingManagerInstance.getProposal(proposalId);
            
            expect(hasVoted).to.equal(false);
            expect(proposal.totalVotes).to.equal(1);
            expect(proposal.concluded).to.equal(false);

            await votingManagerInstance.connect(addr3).castVote(proposalId, Vote.YES);

            hasVoted = await votingManagerInstance.hasVoted(proposalId, addr3.address);
            proposal = await votingManagerInstance.getProposal(proposalId);

            expect(proposal.totalVotes).to.equal(2);
            expect(proposal.concluded).to.equal(false);
            expect(hasVoted).to.equal(true);

            const votes = await votingManagerInstance.getVotes(proposalId);
            const yesVotes = votes[0];
            const noVotes = votes[1];

            console.log(`Yes votes: ${yesVotes.toString()}, No votes: ${noVotes.toString()}`);

            expect(yesVotes).to.equal(2);
            expect(noVotes).to.equal(0);


        });

        it("Addr2 should cast a vote in proposal 1", async function () {
            const proposalId = 1;

            let hasVoted = await votingManagerInstance.hasVoted(proposalId, addr2.address);
            let proposal = await votingManagerInstance.getProposal(proposalId);
            
            expect(hasVoted).to.equal(false);
            expect(proposal.totalVotes).to.equal(0);
            expect(proposal.concluded).to.equal(false);

            await votingManagerInstance.connect(addr2).castVote(proposalId, Vote.YES);

            hasVoted = await votingManagerInstance.hasVoted(proposalId, addr2.address);
            proposal = await votingManagerInstance.getProposal(proposalId);

            expect(proposal.totalVotes).to.equal(1);
            expect(proposal.concluded).to.equal(false);
            expect(hasVoted).to.equal(true);

            const votes = await votingManagerInstance.getVotes(proposalId);
            const yesVotes = votes[0];
            const noVotes = votes[1];

            console.log(`Yes votes: ${yesVotes.toString()}, No votes: ${noVotes.toString()}`);

            expect(yesVotes).to.equal(1);
            expect(noVotes).to.equal(0);


        });

        it("Addr3 should cast a vote in proposal 3", async function () {
            const proposalId = 3;

            let hasVoted = await votingManagerInstance.hasVoted(proposalId, addr3.address);
            let proposal = await votingManagerInstance.getProposal(proposalId);
            
            expect(hasVoted).to.equal(false);
            expect(proposal.totalVotes).to.equal(0);
            expect(proposal.concluded).to.equal(false);

            await votingManagerInstance.connect(addr3).castVote(proposalId, Vote.NO);

            hasVoted = await votingManagerInstance.hasVoted(proposalId, addr3.address);
            proposal = await votingManagerInstance.getProposal(proposalId);

            expect(proposal.totalVotes).to.equal(1);
            expect(proposal.concluded).to.equal(false);
            expect(hasVoted).to.equal(true);

            const votes = await votingManagerInstance.getVotes(proposalId);
            const yesVotes = votes[0];
            const noVotes = votes[1];

            console.log(`Yes votes: ${yesVotes.toString()}, No votes: ${noVotes.toString()}`);

            expect(yesVotes).to.equal(0);
            expect(noVotes).to.equal(1);


        });

        it("Addr2 should cast a vote in proposal 3", async function () {
            const proposalId = 3;

            let hasVoted = await votingManagerInstance.hasVoted(proposalId, addr2.address);
            let proposal = await votingManagerInstance.getProposal(proposalId);
            
            expect(hasVoted).to.equal(false);
            expect(proposal.totalVotes).to.equal(1);
            expect(proposal.concluded).to.equal(false);

            await votingManagerInstance.connect(addr2).castVote(proposalId, Vote.YES);

            hasVoted = await votingManagerInstance.hasVoted(proposalId, addr2.address);
            proposal = await votingManagerInstance.getProposal(proposalId);

            expect(proposal.totalVotes).to.equal(2);
            expect(proposal.concluded).to.equal(false);
            expect(hasVoted).to.equal(true);

            const votes = await votingManagerInstance.getVotes(proposalId);
            const yesVotes = votes[0];
            const noVotes = votes[1];

            console.log(`Yes votes: ${yesVotes.toString()}, No votes: ${noVotes.toString()}`);

            expect(yesVotes).to.equal(1);
            expect(noVotes).to.equal(1);


        });

        it("Addr3 should cast a vote in proposal 1", async function () {
            const proposalId = 1;

            let hasVoted = await votingManagerInstance.hasVoted(proposalId, addr3.address);
            let proposal = await votingManagerInstance.getProposal(proposalId);
            
            expect(hasVoted).to.equal(false);
            expect(proposal.totalVotes).to.equal(1);
            expect(proposal.concluded).to.equal(false);

            await votingManagerInstance.connect(addr3).castVote(proposalId, Vote.NO);

            hasVoted = await votingManagerInstance.hasVoted(proposalId, addr3.address);
            proposal = await votingManagerInstance.getProposal(proposalId);

            expect(proposal.totalVotes).to.equal(2);
            expect(proposal.concluded).to.equal(false);
            expect(hasVoted).to.equal(true);

            const votes = await votingManagerInstance.getVotes(proposalId);
            const yesVotes = votes[0];
            const noVotes = votes[1];

            console.log(`Yes votes: ${yesVotes.toString()}, No votes: ${noVotes.toString()}`);

            expect(yesVotes).to.equal(1);
            expect(noVotes).to.equal(1);


        });

        it("Addr2 should not cast a vote in a proposal where he has voted", async function () {
            const proposalId = 0;

            let hasVoted = await votingManagerInstance.hasVoted(proposalId, addr2.address);
            let proposal = await votingManagerInstance.getProposal(proposalId);
            
            expect(hasVoted).to.equal(true);

            try {
                await votingManagerInstance.connect(addr2).castVote(proposalId, Vote.YES);
                expect.fail("Expected castVote to throw an error, but it didn't");
            } catch (error) {
                expect(error).to.be.an('error');
            }

            


        });

        it("Addr3 should not cast a vote in a proposal where he has voted", async function () {
            const proposalId = 0;

            let hasVoted = await votingManagerInstance.hasVoted(proposalId, addr3.address);
            
            expect(hasVoted).to.equal(true);

            try {
                await votingManagerInstance.connect(addr3).castVote(proposalId, Vote.YES);
                expect.fail("Expected castVote to throw an error, but it didn't");
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });
    });

    describe("Conclusion of a proposal", function () {
        it("Voting proposal creator should conclude it", async function () {
            const proposalId = 0;

            await mineSomeBlocks(10000000000);
    
            await votingManagerInstance.connect(addr1).concludeVoting(proposalId);
    
            let proposal = await votingManagerInstance.getProposal(proposalId);
    
            expect(proposal.concluded).to.equal(true);
        });
    
        it("Addr3 should not cast a vote in a closed proposal", async function () {
            const proposalId = 0;
            
            let proposal = await votingManagerInstance.getProposal(proposalId);
            expect(proposal.concluded).to.equal(true);

            try {
                await votingManagerInstance.connect(addr3).castVote(proposalId, Vote.YES);
                expect.fail("Expected castVote to throw an error, but it didn't");
            } catch (error) {
                expect(error).to.be.an('error');
            }
        });
    });

});