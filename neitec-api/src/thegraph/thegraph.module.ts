import { Module } from '@nestjs/common';
import { TheGraphService } from './thegraph.service';
// import { AccountService } from 'src/account/account.service';
// import { AccountModule } from 'src/account/account.module';
// import { WatchlistModule } from 'src/watchlist/watchlist.module';

@Module({
  // imports: [AccountModule, WatchlistModule],
  providers: [TheGraphService],
  exports: [TheGraphService],
})
export class TheGraphModule {}
