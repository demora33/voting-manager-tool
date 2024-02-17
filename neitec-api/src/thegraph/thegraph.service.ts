import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
// import { AccountService } from '../account/account.service';
// import { WatchlistService } from 'src/watchlist/watchlist.service';
import axios from 'axios';
import { execute, getBuiltGraphSDK } from '../../.graphclient'
// import { UpdateAccountDTO } from 'src/account/dto/account.dto';
// import { AccountStatus } from '../account/dto/account.dto';
// import { Account } from 'src/account/schemas/account.schema';
require('dotenv').config();

const { GetProposals } = getBuiltGraphSDK()

@Injectable()
export class TheGraphService {
  private readonly logger = new Logger(TheGraphService.name);

  constructor(
    // private watchlistService: WatchlistService,
    // private accountService: AccountService,
  ) {}

  // This cron method is executed every minute. It checks for any change in the state
  // of the accounts in the latest watchlist.
  // For the future, this method can be executed to update several watchlists at a time.
  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    this.logger.debug('Cron has started');
    console.log('------------------------------------');

    const query = `
    {
      votingProposalCreateds(orderBy: conclusionDate, orderDirection: asc) {
        id
        votingProposalId
        creator
        proposalHash
        creationDate
        conclusionDate
        blockNumber
        blockTimestamp
        transactionHash
      }
    }
  `;

   const proposals = await GetProposals();

    // Log the response
    console.log(proposals);

    console.log('------------------------------------');
  }

  // This method checks if there is any change in the state between the local database
  // and the Algorand Testnet. If there is a change, it updates the local database.
  // Returns the updated account.
  // private async checkAndUpdateAccount(
  //   account: any,
  // ): Promise<{ updatedAccount: Account; updated: boolean }> {
  //   try {
  //     console.log(
  //       `Checking account ${account.address} state on the Algorand Testnet`,
  //     );
  //     const baseUrl = process.env.ALGONODE_TESTNET_URL;
  //     const response = await axios.get(
  //       `${baseUrl}/v2/accounts/${account.address}`,
  //     );

  //     const accountAlgorandData = response.data;

  //     let updateAccount: UpdateAccountDTO = {
  //       lastBlockUpdate: 0,
  //       balance: '',
  //       status: AccountStatus.Offline,
  //       rewards: 0,
  //     };

  //     // There are more fields that can be checked for changes, but for the purpose of this
  //     // project, I am only considering this.
  //     if (accountAlgorandData.amount !== account.balance) {
  //       updateAccount.balance = accountAlgorandData.amount;
  //       updateAccount.lastBlockUpdate = accountAlgorandData.round;

  //       console.log(
  //         `Account ${account.address} state changed. New balance: ${
  //           accountAlgorandData.amount / 1000000
  //         }`,
  //       );
  //     }
  //     if (accountAlgorandData.status !== account.status) {
  //       updateAccount.status = accountAlgorandData.status;
  //       updateAccount.lastBlockUpdate = accountAlgorandData.round;
  //       console.log(
  //         `Account ${account.address} state changed. New status: ${accountAlgorandData.status}`,
  //       );
  //     }
  //     if (accountAlgorandData.rewards !== account.rewards) {
  //       updateAccount.rewards = accountAlgorandData.rewards;
  //       updateAccount.lastBlockUpdate = accountAlgorandData.round;
  //       console.log(
  //         `Account ${account.address} state changed. New rewards: ${accountAlgorandData.rewards}`,
  //       );
  //     }
  //     // If there is a change in the account state, update the local database
  //     if (updateAccount.lastBlockUpdate != 0) {
  //       console.log(
  //         `Updating account ${account.address} in the local database`,
  //       );
  //       console.log('------------------------------------');

  //       const updatedAccount = await this.accountService.updateAccount(
  //         account._id.toString(),
  //         updateAccount,
  //       );
  //       return { updatedAccount: updatedAccount, updated: true };
  //     } else {
  //       console.log(`Account ${account.address} state has not changed`);
  //       console.log('------------------------------------');

  //       return { updatedAccount: account, updated: false };
  //     }
  //   } catch (error) {
  //     console.error(
  //       `Error querying account ${account.address}: ${error.message}`,
  //     );
  //     throw error;
  //   }
  // }
}
