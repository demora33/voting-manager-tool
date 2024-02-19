import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProposalModule } from './proposal/proposal.module';
import { TheGraphModule } from './thegraph/thegraph.module';
require('dotenv').config();

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ProposalModule,
    TheGraphModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
