// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace VotingSubgraphTypes {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
  Int8: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Initialized = {
  id: Scalars['Bytes'];
  version: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type Initialized_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  version?: InputMaybe<Scalars['BigInt']>;
  version_not?: InputMaybe<Scalars['BigInt']>;
  version_gt?: InputMaybe<Scalars['BigInt']>;
  version_lt?: InputMaybe<Scalars['BigInt']>;
  version_gte?: InputMaybe<Scalars['BigInt']>;
  version_lte?: InputMaybe<Scalars['BigInt']>;
  version_in?: InputMaybe<Array<Scalars['BigInt']>>;
  version_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Initialized_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Initialized_filter>>>;
};

export type Initialized_orderBy =
  | 'id'
  | 'version'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type OwnershipTransferred = {
  id: Scalars['Bytes'];
  previousOwner: Scalars['Bytes'];
  newOwner: Scalars['Bytes'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type OwnershipTransferred_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  previousOwner?: InputMaybe<Scalars['Bytes']>;
  previousOwner_not?: InputMaybe<Scalars['Bytes']>;
  previousOwner_gt?: InputMaybe<Scalars['Bytes']>;
  previousOwner_lt?: InputMaybe<Scalars['Bytes']>;
  previousOwner_gte?: InputMaybe<Scalars['Bytes']>;
  previousOwner_lte?: InputMaybe<Scalars['Bytes']>;
  previousOwner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  previousOwner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  previousOwner_contains?: InputMaybe<Scalars['Bytes']>;
  previousOwner_not_contains?: InputMaybe<Scalars['Bytes']>;
  newOwner?: InputMaybe<Scalars['Bytes']>;
  newOwner_not?: InputMaybe<Scalars['Bytes']>;
  newOwner_gt?: InputMaybe<Scalars['Bytes']>;
  newOwner_lt?: InputMaybe<Scalars['Bytes']>;
  newOwner_gte?: InputMaybe<Scalars['Bytes']>;
  newOwner_lte?: InputMaybe<Scalars['Bytes']>;
  newOwner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  newOwner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  newOwner_contains?: InputMaybe<Scalars['Bytes']>;
  newOwner_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<OwnershipTransferred_filter>>>;
  or?: InputMaybe<Array<InputMaybe<OwnershipTransferred_filter>>>;
};

export type OwnershipTransferred_orderBy =
  | 'id'
  | 'previousOwner'
  | 'newOwner'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type Query = {
  initialized?: Maybe<Initialized>;
  initializeds: Array<Initialized>;
  ownershipTransferred?: Maybe<OwnershipTransferred>;
  ownershipTransferreds: Array<OwnershipTransferred>;
  voteCasted?: Maybe<VoteCasted>;
  voteCasteds: Array<VoteCasted>;
  votingConcluded?: Maybe<VotingConcluded>;
  votingConcludeds: Array<VotingConcluded>;
  votingProposalCreated?: Maybe<VotingProposalCreated>;
  votingProposalCreateds: Array<VotingProposalCreated>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryinitializedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryinitializedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Initialized_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Initialized_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryownershipTransferredArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryownershipTransferredsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OwnershipTransferred_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OwnershipTransferred_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvoteCastedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvoteCastedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VoteCasted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VoteCasted_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvotingConcludedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvotingConcludedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VotingConcluded_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VotingConcluded_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvotingProposalCreatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryvotingProposalCreatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VotingProposalCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VotingProposalCreated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  initialized?: Maybe<Initialized>;
  initializeds: Array<Initialized>;
  ownershipTransferred?: Maybe<OwnershipTransferred>;
  ownershipTransferreds: Array<OwnershipTransferred>;
  voteCasted?: Maybe<VoteCasted>;
  voteCasteds: Array<VoteCasted>;
  votingConcluded?: Maybe<VotingConcluded>;
  votingConcludeds: Array<VotingConcluded>;
  votingProposalCreated?: Maybe<VotingProposalCreated>;
  votingProposalCreateds: Array<VotingProposalCreated>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptioninitializedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptioninitializedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Initialized_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Initialized_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionownershipTransferredArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionownershipTransferredsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<OwnershipTransferred_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<OwnershipTransferred_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvoteCastedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvoteCastedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VoteCasted_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VoteCasted_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvotingConcludedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvotingConcludedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VotingConcluded_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VotingConcluded_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvotingProposalCreatedArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionvotingProposalCreatedsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VotingProposalCreated_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<VotingProposalCreated_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type VoteCasted = {
  id: Scalars['Bytes'];
  votingProposalId: Scalars['BigInt'];
  voteOption: Scalars['Int'];
  voteCount: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type VoteCasted_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  votingProposalId?: InputMaybe<Scalars['BigInt']>;
  votingProposalId_not?: InputMaybe<Scalars['BigInt']>;
  votingProposalId_gt?: InputMaybe<Scalars['BigInt']>;
  votingProposalId_lt?: InputMaybe<Scalars['BigInt']>;
  votingProposalId_gte?: InputMaybe<Scalars['BigInt']>;
  votingProposalId_lte?: InputMaybe<Scalars['BigInt']>;
  votingProposalId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingProposalId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  voteOption?: InputMaybe<Scalars['Int']>;
  voteOption_not?: InputMaybe<Scalars['Int']>;
  voteOption_gt?: InputMaybe<Scalars['Int']>;
  voteOption_lt?: InputMaybe<Scalars['Int']>;
  voteOption_gte?: InputMaybe<Scalars['Int']>;
  voteOption_lte?: InputMaybe<Scalars['Int']>;
  voteOption_in?: InputMaybe<Array<Scalars['Int']>>;
  voteOption_not_in?: InputMaybe<Array<Scalars['Int']>>;
  voteCount?: InputMaybe<Scalars['BigInt']>;
  voteCount_not?: InputMaybe<Scalars['BigInt']>;
  voteCount_gt?: InputMaybe<Scalars['BigInt']>;
  voteCount_lt?: InputMaybe<Scalars['BigInt']>;
  voteCount_gte?: InputMaybe<Scalars['BigInt']>;
  voteCount_lte?: InputMaybe<Scalars['BigInt']>;
  voteCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  voteCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VoteCasted_filter>>>;
  or?: InputMaybe<Array<InputMaybe<VoteCasted_filter>>>;
};

export type VoteCasted_orderBy =
  | 'id'
  | 'votingProposalId'
  | 'voteOption'
  | 'voteCount'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type VotingConcluded = {
  id: Scalars['Bytes'];
  votingProposalId: Scalars['BigInt'];
  yesVotes: Scalars['BigInt'];
  noVotes: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type VotingConcluded_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  votingProposalId?: InputMaybe<Scalars['BigInt']>;
  votingProposalId_not?: InputMaybe<Scalars['BigInt']>;
  votingProposalId_gt?: InputMaybe<Scalars['BigInt']>;
  votingProposalId_lt?: InputMaybe<Scalars['BigInt']>;
  votingProposalId_gte?: InputMaybe<Scalars['BigInt']>;
  votingProposalId_lte?: InputMaybe<Scalars['BigInt']>;
  votingProposalId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingProposalId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  yesVotes?: InputMaybe<Scalars['BigInt']>;
  yesVotes_not?: InputMaybe<Scalars['BigInt']>;
  yesVotes_gt?: InputMaybe<Scalars['BigInt']>;
  yesVotes_lt?: InputMaybe<Scalars['BigInt']>;
  yesVotes_gte?: InputMaybe<Scalars['BigInt']>;
  yesVotes_lte?: InputMaybe<Scalars['BigInt']>;
  yesVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  yesVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  noVotes?: InputMaybe<Scalars['BigInt']>;
  noVotes_not?: InputMaybe<Scalars['BigInt']>;
  noVotes_gt?: InputMaybe<Scalars['BigInt']>;
  noVotes_lt?: InputMaybe<Scalars['BigInt']>;
  noVotes_gte?: InputMaybe<Scalars['BigInt']>;
  noVotes_lte?: InputMaybe<Scalars['BigInt']>;
  noVotes_in?: InputMaybe<Array<Scalars['BigInt']>>;
  noVotes_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VotingConcluded_filter>>>;
  or?: InputMaybe<Array<InputMaybe<VotingConcluded_filter>>>;
};

export type VotingConcluded_orderBy =
  | 'id'
  | 'votingProposalId'
  | 'yesVotes'
  | 'noVotes'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type VotingProposalCreated = {
  id: Scalars['Bytes'];
  votingProposalId: Scalars['BigInt'];
  creator: Scalars['Bytes'];
  proposalHash: Scalars['Bytes'];
  creationDate: Scalars['BigInt'];
  conclusionDate: Scalars['BigInt'];
  blockNumber: Scalars['BigInt'];
  blockTimestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
};

export type VotingProposalCreated_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  votingProposalId?: InputMaybe<Scalars['BigInt']>;
  votingProposalId_not?: InputMaybe<Scalars['BigInt']>;
  votingProposalId_gt?: InputMaybe<Scalars['BigInt']>;
  votingProposalId_lt?: InputMaybe<Scalars['BigInt']>;
  votingProposalId_gte?: InputMaybe<Scalars['BigInt']>;
  votingProposalId_lte?: InputMaybe<Scalars['BigInt']>;
  votingProposalId_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingProposalId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creator?: InputMaybe<Scalars['Bytes']>;
  creator_not?: InputMaybe<Scalars['Bytes']>;
  creator_gt?: InputMaybe<Scalars['Bytes']>;
  creator_lt?: InputMaybe<Scalars['Bytes']>;
  creator_gte?: InputMaybe<Scalars['Bytes']>;
  creator_lte?: InputMaybe<Scalars['Bytes']>;
  creator_in?: InputMaybe<Array<Scalars['Bytes']>>;
  creator_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  creator_contains?: InputMaybe<Scalars['Bytes']>;
  creator_not_contains?: InputMaybe<Scalars['Bytes']>;
  proposalHash?: InputMaybe<Scalars['Bytes']>;
  proposalHash_not?: InputMaybe<Scalars['Bytes']>;
  proposalHash_gt?: InputMaybe<Scalars['Bytes']>;
  proposalHash_lt?: InputMaybe<Scalars['Bytes']>;
  proposalHash_gte?: InputMaybe<Scalars['Bytes']>;
  proposalHash_lte?: InputMaybe<Scalars['Bytes']>;
  proposalHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  proposalHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  proposalHash_contains?: InputMaybe<Scalars['Bytes']>;
  proposalHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  creationDate?: InputMaybe<Scalars['BigInt']>;
  creationDate_not?: InputMaybe<Scalars['BigInt']>;
  creationDate_gt?: InputMaybe<Scalars['BigInt']>;
  creationDate_lt?: InputMaybe<Scalars['BigInt']>;
  creationDate_gte?: InputMaybe<Scalars['BigInt']>;
  creationDate_lte?: InputMaybe<Scalars['BigInt']>;
  creationDate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  creationDate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  conclusionDate?: InputMaybe<Scalars['BigInt']>;
  conclusionDate_not?: InputMaybe<Scalars['BigInt']>;
  conclusionDate_gt?: InputMaybe<Scalars['BigInt']>;
  conclusionDate_lt?: InputMaybe<Scalars['BigInt']>;
  conclusionDate_gte?: InputMaybe<Scalars['BigInt']>;
  conclusionDate_lte?: InputMaybe<Scalars['BigInt']>;
  conclusionDate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  conclusionDate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber?: InputMaybe<Scalars['BigInt']>;
  blockNumber_not?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_not?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lt?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_gte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_lte?: InputMaybe<Scalars['BigInt']>;
  blockTimestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  blockTimestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lt?: InputMaybe<Scalars['Bytes']>;
  transactionHash_gte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_lte?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<VotingProposalCreated_filter>>>;
  or?: InputMaybe<Array<InputMaybe<VotingProposalCreated_filter>>>;
};

export type VotingProposalCreated_orderBy =
  | 'id'
  | 'votingProposalId'
  | 'creator'
  | 'proposalHash'
  | 'creationDate'
  | 'conclusionDate'
  | 'blockNumber'
  | 'blockTimestamp'
  | 'transactionHash';

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

  export type QuerySdk = {
      /** null **/
  initialized: InContextSdkMethod<Query['initialized'], QueryinitializedArgs, MeshContext>,
  /** null **/
  initializeds: InContextSdkMethod<Query['initializeds'], QueryinitializedsArgs, MeshContext>,
  /** null **/
  ownershipTransferred: InContextSdkMethod<Query['ownershipTransferred'], QueryownershipTransferredArgs, MeshContext>,
  /** null **/
  ownershipTransferreds: InContextSdkMethod<Query['ownershipTransferreds'], QueryownershipTransferredsArgs, MeshContext>,
  /** null **/
  voteCasted: InContextSdkMethod<Query['voteCasted'], QueryvoteCastedArgs, MeshContext>,
  /** null **/
  voteCasteds: InContextSdkMethod<Query['voteCasteds'], QueryvoteCastedsArgs, MeshContext>,
  /** null **/
  votingConcluded: InContextSdkMethod<Query['votingConcluded'], QueryvotingConcludedArgs, MeshContext>,
  /** null **/
  votingConcludeds: InContextSdkMethod<Query['votingConcludeds'], QueryvotingConcludedsArgs, MeshContext>,
  /** null **/
  votingProposalCreated: InContextSdkMethod<Query['votingProposalCreated'], QueryvotingProposalCreatedArgs, MeshContext>,
  /** null **/
  votingProposalCreateds: InContextSdkMethod<Query['votingProposalCreateds'], QueryvotingProposalCreatedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  initialized: InContextSdkMethod<Subscription['initialized'], SubscriptioninitializedArgs, MeshContext>,
  /** null **/
  initializeds: InContextSdkMethod<Subscription['initializeds'], SubscriptioninitializedsArgs, MeshContext>,
  /** null **/
  ownershipTransferred: InContextSdkMethod<Subscription['ownershipTransferred'], SubscriptionownershipTransferredArgs, MeshContext>,
  /** null **/
  ownershipTransferreds: InContextSdkMethod<Subscription['ownershipTransferreds'], SubscriptionownershipTransferredsArgs, MeshContext>,
  /** null **/
  voteCasted: InContextSdkMethod<Subscription['voteCasted'], SubscriptionvoteCastedArgs, MeshContext>,
  /** null **/
  voteCasteds: InContextSdkMethod<Subscription['voteCasteds'], SubscriptionvoteCastedsArgs, MeshContext>,
  /** null **/
  votingConcluded: InContextSdkMethod<Subscription['votingConcluded'], SubscriptionvotingConcludedArgs, MeshContext>,
  /** null **/
  votingConcludeds: InContextSdkMethod<Subscription['votingConcludeds'], SubscriptionvotingConcludedsArgs, MeshContext>,
  /** null **/
  votingProposalCreated: InContextSdkMethod<Subscription['votingProposalCreated'], SubscriptionvotingProposalCreatedArgs, MeshContext>,
  /** null **/
  votingProposalCreateds: InContextSdkMethod<Subscription['votingProposalCreateds'], SubscriptionvotingProposalCreatedsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["voting_subgraph"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
