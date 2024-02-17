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

  async updateProposalVote(votingProposalId: number, voteOption: number): Promise<Proposal> {
    let update;
    if (voteOption === 0) {
      update = { $inc: { yesVotes: 1 } };
    } else if (voteOption === 1) {
      update = { $inc: { noVotes: 1 } };
    } else {
      throw new Error('Invalid voteOption');
    }
  
    return this.proposalModel.findOneAndUpdate({ votingProposalId }, update, { new: true }).exec();
  }

  async findProposalById(id: number): Promise<Proposal | null> {
    return this.proposalModel.findOne({ votingProposalId: id }).exec();
  }

  async findAllProposals(): Promise<Proposal[]> {
    return this.proposalModel.find().exec();
  }
}
