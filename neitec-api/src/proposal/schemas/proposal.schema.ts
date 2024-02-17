import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Proposal {
  @Prop({ required: true })
  address: string;

  @Prop({ default: 0 })
  balance: number;

  @Prop({ default: 0 })
  lastBlockUpdate: number;

  @Prop({ default: 0 })
  rewards: number;
}

export const ProposalSchema = SchemaFactory.createForClass(Proposal);
