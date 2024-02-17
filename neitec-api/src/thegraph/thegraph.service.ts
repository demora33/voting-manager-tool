import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { execute, getBuiltGraphSDK } from '../../.graphclient';
import { ProposalService } from 'src/proposal/proposal.service';
import { ethers } from 'ethers';
// import { UpdateAccountDTO } from 'src/account/dto/account.dto';
// import { AccountStatus } from '../account/dto/account.dto';
import { Proposal } from 'src/proposal/schemas/proposal.schema';
require('dotenv').config();

const { GetProposals, GetProposalById } = getBuiltGraphSDK();

@Injectable()
export class TheGraphService {
  private readonly logger = new Logger(TheGraphService.name);

  constructor(private proposalService: ProposalService) {
    // private accountService: AccountService, // private watchlistService: WatchlistService,
  }

  // This cron method is executed every minute. It checks for any change in the state
  // of the accounts in the latest watchlist.
  // For the future, this method can be executed to update several watchlists at a time.
  @Cron(CronExpression.EVERY_30_SECONDS)
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
}
