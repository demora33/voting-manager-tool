import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Proposal } from './schemas/Proposal.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProposalService {
  constructor(
    @InjectModel(Proposal.name) private proposalModel: Model<Proposal>,
  ) {}

  async createProposal(proposal: Proposal): Promise<Proposal> {
    console.log('Creating a new proposal');

    const newProposal = new this.proposalModel(proposal);
    return newProposal.save();
  }

  async updateProposalVote(votingProposalId: number, voteOption: number, blockNumber: number): Promise<Proposal> {
    let update;
    if (voteOption === 0) {
      update = { $inc: { yesVotes: 1 }, $set: { lastBlockUpdate: blockNumber }};
    } else if (voteOption === 1) {
      update = { $inc: { noVotes: 1 }, $set: { lastBlockUpdate: blockNumber }};
    } else {
      throw new Error('Invalid voteOption');
    }
  
    return this.proposalModel.findOneAndUpdate({ votingProposalId }, update, { new: true }).exec();
  }

  async concludeProposal(proposal: any): Promise<Proposal> {
    const update = {
      $set: {
        noVotes: proposal.noVotes,
        yesVotes: proposal.yesVotes,
        concluded: true
      }
    };
  
    return this.proposalModel.findOneAndUpdate({ votingProposalId: proposal.votingProposalId }, update, { new: true }).exec();
  }

  async findProposalById(id: number): Promise<Proposal | null> {
    return this.proposalModel.findOne({ votingProposalId: id }).exec();
  }

  async findAllProposals(): Promise<Proposal[]> {
    return this.proposalModel.find().exec();
  }

  async getLargestLastBlockUpdated(): Promise<number> {
    const proposal = await this.proposalModel.find({}, { lastBlockUpdate: 1 }).sort({ lastBlockUpdate: -1 }).limit(1).exec();
    if (proposal.length > 0) {
      return proposal[0].lastBlockUpdate;
    } else {
      return 0;
    }
  }

  async getLargestCreationDate(): Promise<number> {
    const proposal = await this.proposalModel.find({}, { creationDate: 1 }).sort({ creationDate: -1 }).limit(1).exec();
    if (proposal.length > 0) {
      return proposal[0].creationDate;
    } else {
      return 0;
    }
  }

  async getTotalVotesByProposalId(votingProposalId: number): Promise<number> {
    const proposal = await this.proposalModel.findOne({ votingProposalId }).exec();
    if (proposal) {
      return proposal.yesVotes + proposal.noVotes;
    } else {
      throw new Error('No proposal found with the provided id');
    }
  }

  async getConcludableProposals(): Promise<number[]> {
    const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
    const proposals = await this.proposalModel.find({ conclusionDate: { $lt: currentTimestampInSeconds }, concluded: false }, { votingProposalId: 1 }).exec();
    if (proposals.length === 0) {
      console.log('No concludable proposals found');
      return [];
    }
    return proposals.map(proposal => proposal.votingProposalId);
  }
}
