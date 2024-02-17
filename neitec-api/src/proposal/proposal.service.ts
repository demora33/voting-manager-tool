import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Proposal } from './schemas/Proposal.schema';
import { Model } from 'mongoose';
// import { UpdateProposalDTO } from './dto/Proposal.dto';

@Injectable()
export class ProposalService {
  constructor(
    @InjectModel(Proposal.name) private ProposalModel: Model<Proposal>,
  ) {}

  async createProposal(address: string): Promise<Proposal> {
    const createdProposal = new this.ProposalModel({ address });
    return createdProposal.save();
  }

  // async updateProposal(
  //   id: string,
  //   updateProposalDTO: UpdateProposalDTO,
  // ): Promise<Proposal> {
  //   return this.ProposalModel

  //     .findByIdAndUpdate(id, updateProposalDTO, { new: true })
  //     .exec();
  // }

  async findAll(): Promise<Proposal[]> {
    return this.ProposalModel.find().exec();
  }

  async findProposalByAddress(address: string): Promise<Proposal> {
    return this.ProposalModel.findOne({ address: address }).exec();
  }

  async findProposal(id: string): Promise<Proposal> {
    return this.ProposalModel.findById(id).exec();
  }
}
