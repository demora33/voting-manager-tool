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


    // CHECK FOR NEW PROPOSALS
    const response = await GetProposals();
    const proposals = response.votingProposalCreateds;

    if (proposals.length > 0) {
      console.log(`Found ${proposals.length} proposals`);

      const proposalIds = proposals.map(
        (proposal) => proposal.votingProposalId,
      );
      console.log(`Proposal IDs: ${proposalIds}`);
      await this.checkforNewProposals(proposalIds);
    } else {
      console.log('No proposals found');
    }

    // CHECK FOR NEW VOTES SINCE LAST UPDATED BLOCK
    const blockNumber = await this.proposalService.getSmallestLastBlockUpdated();
    const responseVotes = await GetNewVotes({ latestUpdatedBlock: blockNumber || 0 });

    if (responseVotes.voteCasteds.length > 0) {
      console.log(
        `Found ${responseVotes.voteCasteds.length} new votes`,
      );
      const votes = responseVotes.voteCasteds;
  
      await this.updateVotes(votes);
    }







    console.log('Cron has ended');

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
            concluded: false,
            yesVotes: 0,
            noVotes: 0,
            lastBlockUpdate: proposal.blockNumber,
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
      if (vote.voteOption === 1 || vote.voteOption === 0) {
        await this.proposalService.updateProposalVote(vote.votingProposalId, vote.voteOption, vote.blockNumber);
      } else {
        throw new Error('Invalid voteOption');
      }
    }
  }
  
}
