import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Proposal {
  @Prop({ required: true })
  creator: string;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true })
  votingProposalId: number;

  @Prop({ required: true })
  creationDate: number;

  @Prop({ required: true })
  conclusionDate: number;

  @Prop({ default: 0 })
  lastBlockUpdate: number;

  @Prop({ default: 0 })
  yesVotes: number;

  @Prop({ default: 0 })
  noVotes: number;
}

export const ProposalSchema = SchemaFactory.createForClass(Proposal);
