import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Proposal, ProposalSchema } from './schemas/proposal.schema';
import { ProposalService } from './proposal.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Proposal.name,
        schema: ProposalSchema,
      },
    ]),
  ],
  providers: [ProposalService],
  controllers: [],
  exports: [ProposalService],
})
export class ProposalModule {}
