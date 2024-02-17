import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProposalService } from './proposal.service';

@Controller('proposal')
export class ProposalController {
  constructor(
    private proposalService: ProposalService
  ) {}

  @Get()
  async getProposals(
    // @Param('watchlistId') watchlistId: string
  ) {
    return "hola";
    // return this.proposalService.getAccountsByWatchlistId(watchlistId);
  }

//   @Post('add/:watchlistId')
//   async addAccount(
//     @Param('watchlistId') watchlistId: string,
//     @Body('account') account: string
//     ) {
//     return this.proposalService.addAccount(watchlistId, account);
//   }

//   @Post('create')
//   async createWatchlist(@Body('watchlistName') watchlistName: string) {
//     return this.proposalService.create(watchlistName);

//   }
}
