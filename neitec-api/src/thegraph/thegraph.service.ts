import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { execute, getBuiltGraphSDK } from '../../.graphclient';
import { ProposalService } from 'src/proposal/proposal.service';
import { ethers } from 'ethers';
import { Proposal } from 'src/proposal/schemas/proposal.schema';
require('dotenv').config();

const { GetProposals, GetProposalById, GetNewVotes } = getBuiltGraphSDK();

@Injectable()
export class TheGraphService {
  private readonly logger = new Logger(TheGraphService.name);

  constructor(private proposalService: ProposalService) {
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async handleCron() {
    this.logger.debug('Cron has started');
    console.log('------------------------------------');

    const response = await GetProposals();
    const proposals = response.votingProposalCreateds;

    if (proposals.length > 0) {
      console.log(`Found ${proposals.length} proposals`);

      const proposalIds = proposals.map(
        (proposal) => proposal.votingProposalId,
      );
      console.log(`Proposal IDs: ${proposalIds}`);
      await this.checkforNewProposals(proposalIds);

      const responseVotes = await GetNewVotes({ lastProposalId: proposals.length });
      const votes = responseVotes.voteCasteds;

      await this.updateVotes(votes);

      console.log(votes)

    } else {
      console.log('No proposals found');
    }

    console.log('------------------------------------');
  }

  private async checkforNewProposals(proposalIds: number[]): Promise<void> {
    try {
      console.log(`Checking proposals in the database`);

      for (const proposalId of proposalIds) {
        const existingProposal = await this.proposalService.findProposalById(
          proposalId
        );

        if (!existingProposal) {
          console.log(
            `Proposal ${proposalId} not found in the database. Creating a new proposal.`,
          );

          const response = await GetProposalById({ votingProposalId: proposalId });
          const proposal = response.votingProposalCreateds[0];

          const newProposal: Proposal = {
            creator: proposal.creator,
            votingProposalId: proposal.votingProposalId,
            message: proposal.proposalHash,
            creationDate: proposal.creationDate,
            conclusionDate: proposal.conclusionDate,
            yesVotes: 0,
            noVotes: 0,
            lastBlockUpdate: 0,
          };
          console.log(`New proposal: ${JSON.stringify(newProposal)}`);
          await this.proposalService.createProposal(newProposal);
        } else {
          console.log(
            `Proposal ${proposalId} already exists in the database.`,
          );

        }
      }
    } catch (error) {
      console.error(`Error checking and updating proposals: ${error.message}`);
      throw error;
    }
  }

  private async updateVotes(votes) {
    for (const vote of votes) {
      if (vote.voteOption === 1) {
        // Aquí actualizas la base de datos para añadir un voto a favor (yesVote)
        await this.updateProposal(vote.votingProposalId, { $inc: { noVotes: 1 } });
      } else if (vote.voteOption === 0) {
        // Aquí actualizas la base de datos para añadir un voto en contra (noVote)
        await this.updateProposal(vote.votingProposalId, { $inc: { yesVotes: 1 } });
      }
    }
  }
  
  async updateProposal(proposalId, update) {
    // Aquí implementas la lógica para actualizar la propuesta en la base de datos
    // Esta es solo una función de ejemplo, necesitarás implementarla según tu base de datos y tu ORM o driver de base de datos
  }
}
