import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { execute, getBuiltGraphSDK } from '../../.graphclient';
import { ProposalService } from 'src/proposal/proposal.service';
import { ethers } from 'ethers';
import { Proposal } from 'src/proposal/schemas/proposal.schema';
require('dotenv').config();

const { GetProposals, GetProposalById, GetNewVotes, GetConcluded, GetVotesById } = getBuiltGraphSDK();

@Injectable()
export class TheGraphService {
  private readonly logger = new Logger(TheGraphService.name);

  constructor(private proposalService: ProposalService) {
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    this.logger.debug('Cron has started');
    console.log('------------------------------------');

    console.log(`Current date: ${new Date()}`);
    const endDate = new Date();
    endDate.setMinutes(endDate.getMinutes() + 5);
    const timestamp = Math.floor(endDate.getTime() / 1000);
    console.log(`End date: ${timestamp}`);

    
    // CHECK FOR NEW PROPOSALS
    const lastCreationDate = await this.proposalService.getLargestCreationDate();
    console.log(`Last creation date: ${lastCreationDate}`);
    const response = await GetProposals({ lastCreationDate: lastCreationDate});
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
    const blockNumber = await this.proposalService.getLargestLastBlockUpdated();
    console.log(`Block number: ${blockNumber}`);


    const responseVotes = await GetNewVotes({ latestUpdatedBlock: blockNumber });

    if (responseVotes.voteCasteds.length > 0) {
      console.log(
        `Found ${responseVotes.voteCasteds.length} new votes`,
      );
      const votes = responseVotes.voteCasteds;

      console.log(votes);
  
      await this.updateVotes(votes);
    }
    else {
      console.log('No new votes found');
    }


    // CHECK FOR CONCLUDED PROPOSALS
    const concludedProposalsId = await this.proposalService.getConcludableProposals();

    if (concludedProposalsId.length > 0) {
      console.log(
        `Found ${concludedProposalsId.length} possible concluded proposals`,
      );

      for (const proposalId of concludedProposalsId) {
        const responseConcludedProposal = await GetConcluded({ votingProposalId: proposalId });
      
        if (responseConcludedProposal.votingConcludeds.length > 0) {
          console.log(
            `Found a concluded proposal for proposalId ${proposalId}`,
            );
            const concludedProposal = responseConcludedProposal.votingConcludeds;

            await this.proposalService.concludeProposal(concludedProposal[0]);
        }
        else {
          console.log(
            `No concluded proposal found in blockchain for proposalId ${proposalId}`,
          );
        
        }
      }
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
      const totalVotesInBc = await GetVotesById({ votingProposalId: vote.votingProposalId });
      const totalVotesInDb = await this.proposalService.getTotalVotesByProposalId(vote.votingProposalId);

      if (totalVotesInBc.voteCasteds.length == totalVotesInDb) {
        console.log('No new votes');
        continue;
      }
      
      if (vote.voteOption === 1 || vote.voteOption === 0) {
        await this.proposalService.updateProposalVote(vote.votingProposalId, vote.voteOption, vote.blockNumber);
      } else {
        throw new Error('Invalid voteOption');
      }
    }
  }

  
}
