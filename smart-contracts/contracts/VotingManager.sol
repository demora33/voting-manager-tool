// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

/**
 * @title VotingManager
 * @dev This contract manages the creation, voting, and conclusion of proposals.
 */
contract VotingManager is Initializable, OwnableUpgradeable {
    /**
     * @dev Struct for a voting proposal.
     */
    struct VotingProposal {
        uint256 votingProposalId;
        uint256 totalVotes;
        address creator;
        bytes32 proposalHash;
        uint256 creationDate;
        uint256 conclusionDate;
        bool concluded;
    }

    /**
     * @dev Enum for vote options.
     */
    enum VoteOption { 
        YES, 
        NO 
    }

    uint256 public nextVotingProposalId;
    mapping(uint256 => VotingProposal) public votingProposals;
    mapping(uint256 => mapping (VoteOption => uint256)) public voteCounts;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    /**
     * @dev Events for proposal creation, vote casting, and voting conclusion.
     */
    event VotingProposalCreated(uint256 votingProposalId, address creator, bytes32 proposalHash, uint256 creationDate, uint256 conclusionDate);
    event VoteCasted(uint256 votingProposalId, VoteOption voteOption, uint256 voteCount);
    event VotingConcluded(uint256 votingProposalId, uint256 yesVotes, uint256 noVotes);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /**
     * @dev Initializes the contract.
     */
    function initialize() initializer public {
        __Ownable_init(msg.sender);
        __ReentrancyGuard_init();
        nextVotingProposalId = 0;
    }

    /**
     * @dev Creates a new voting proposal.
     */
    function createVotingProposal(bytes32 proposalHash, uint256 endDate) public {
        require(endDate > block.timestamp, "End date must be in the future.");
        uint256 votingProposalId = nextVotingProposalId;
    
        VotingProposal storage newProposal = votingProposals[votingProposalId];
        newProposal.votingProposalId = votingProposalId;
        newProposal.creator = msg.sender;
        newProposal.totalVotes = 0;
        newProposal.proposalHash = proposalHash;
        newProposal.creationDate = block.timestamp;
        newProposal.conclusionDate = endDate;
        newProposal.concluded = false;

        emit VotingProposalCreated(votingProposalId, msg.sender, proposalHash, block.timestamp, endDate);
        nextVotingProposalId += 1;
    }

    /**
     * @dev Casts a vote for a proposal.
     */
    function castVote(uint256 votingProposalId, VoteOption voteOption) public nonReentrant{
        require(!votingProposals[votingProposalId].creationDate > block.timestamp, "This proposal has not been created yet.");
        require(!votingProposals[votingProposalId].concluded, "Voting has already concluded.");
        require(!getHasVoted(votingProposalId, msg.sender), "You have already voted.");
        hasVoted[votingProposalId][msg.sender] = true;
        votingProposals[votingProposalId].totalVotes += 1;
        voteCounts[votingProposalId][voteOption] += 1;
        emit VoteCasted(votingProposalId, voteOption, votingProposals[votingProposalId].totalVotes);
    }

    /**
     * @dev Concludes a voting proposal.
     */
    function concludeVoting(uint256 votingProposalId) public {
        require(block.timestamp > votingProposals[votingProposalId].conclusionDate, "Voting period has not ended yet.");
        require(msg.sender == votingProposals[votingProposalId].creator, "Only the creator can conclude the proposal.");
        require(!votingProposals[votingProposalId].concluded, "Voting has already concluded.");

        votingProposals[votingProposalId].concluded = true;
        (uint256 yesVotes, uint256 noVotes) = getVotes(votingProposalId);

        // TODO: Add logic to perform different operations based on the result of the vote

        emit VotingConcluded(
            votingProposalId, 
            yesVotes, 
            noVotes
        );
    }

    /**
     * @dev Checks if a voter has already voted for a proposal.
     */
    function getHasVoted(uint256 id, address voter) internal view returns (bool) {
        return hasVoted[id][voter];
    }

    /**
     * @dev Returns a voting proposal.
     */
    function getProposal(uint256 id) public view returns (VotingProposal memory) {
        return votingProposals[id];
    }

    /**
     * @dev Returns the vote counts for a proposal.
     */
    function getVotes (uint256 id) public view returns (uint256, uint256) {
        return (voteCounts[id][VoteOption.YES], voteCounts[id][VoteOption.NO]);
    }
}