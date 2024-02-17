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

  async findProposalById(id: number): Promise<Proposal | null> {
    return this.proposalModel.findOne({ votingProposalId: id }).exec();
  }

  async findAllProposals(): Promise<Proposal[]> {
    return this.proposalModel.find().exec();
  }
}
