// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@graphql-mesh/utils';

import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { printWithCache } from '@graphql-mesh/utils';
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { VotingSubgraphTypes } from './sources/voting_subgraph/types';
import * as importedModule$0 from "./sources/voting_subgraph/introspectionSchema";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Initialized: ResolverTypeWrapper<Initialized>;
  Initialized_filter: Initialized_filter;
  Initialized_orderBy: Initialized_orderBy;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Int8: ResolverTypeWrapper<Scalars['Int8']>;
  OrderDirection: OrderDirection;
  OwnershipTransferred: ResolverTypeWrapper<OwnershipTransferred>;
  OwnershipTransferred_filter: OwnershipTransferred_filter;
  OwnershipTransferred_orderBy: OwnershipTransferred_orderBy;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  VoteCasted: ResolverTypeWrapper<VoteCasted>;
  VoteCasted_filter: VoteCasted_filter;
  VoteCasted_orderBy: VoteCasted_orderBy;
  VotingConcluded: ResolverTypeWrapper<VotingConcluded>;
  VotingConcluded_filter: VotingConcluded_filter;
  VotingConcluded_orderBy: VotingConcluded_orderBy;
  VotingProposalCreated: ResolverTypeWrapper<VotingProposalCreated>;
  VotingProposalCreated_filter: VotingProposalCreated_filter;
  VotingProposalCreated_orderBy: VotingProposalCreated_orderBy;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bytes: Scalars['Bytes'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Initialized: Initialized;
  Initialized_filter: Initialized_filter;
  Int: Scalars['Int'];
  Int8: Scalars['Int8'];
  OwnershipTransferred: OwnershipTransferred;
  OwnershipTransferred_filter: OwnershipTransferred_filter;
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  VoteCasted: VoteCasted;
  VoteCasted_filter: VoteCasted_filter;
  VotingConcluded: VotingConcluded;
  VotingConcluded_filter: VotingConcluded_filter;
  VotingProposalCreated: VotingProposalCreated;
  VotingProposalCreated_filter: VotingProposalCreated_filter;
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type InitializedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Initialized'] = ResolversParentTypes['Initialized']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  version?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface Int8ScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Int8'], any> {
  name: 'Int8';
}

export type OwnershipTransferredResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['OwnershipTransferred'] = ResolversParentTypes['OwnershipTransferred']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  previousOwner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  newOwner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  initialized?: Resolver<Maybe<ResolversTypes['Initialized']>, ParentType, ContextType, RequireFields<QueryinitializedArgs, 'id' | 'subgraphError'>>;
  initializeds?: Resolver<Array<ResolversTypes['Initialized']>, ParentType, ContextType, RequireFields<QueryinitializedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  ownershipTransferred?: Resolver<Maybe<ResolversTypes['OwnershipTransferred']>, ParentType, ContextType, RequireFields<QueryownershipTransferredArgs, 'id' | 'subgraphError'>>;
  ownershipTransferreds?: Resolver<Array<ResolversTypes['OwnershipTransferred']>, ParentType, ContextType, RequireFields<QueryownershipTransferredsArgs, 'skip' | 'first' | 'subgraphError'>>;
  voteCasted?: Resolver<Maybe<ResolversTypes['VoteCasted']>, ParentType, ContextType, RequireFields<QueryvoteCastedArgs, 'id' | 'subgraphError'>>;
  voteCasteds?: Resolver<Array<ResolversTypes['VoteCasted']>, ParentType, ContextType, RequireFields<QueryvoteCastedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  votingConcluded?: Resolver<Maybe<ResolversTypes['VotingConcluded']>, ParentType, ContextType, RequireFields<QueryvotingConcludedArgs, 'id' | 'subgraphError'>>;
  votingConcludeds?: Resolver<Array<ResolversTypes['VotingConcluded']>, ParentType, ContextType, RequireFields<QueryvotingConcludedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  votingProposalCreated?: Resolver<Maybe<ResolversTypes['VotingProposalCreated']>, ParentType, ContextType, RequireFields<QueryvotingProposalCreatedArgs, 'id' | 'subgraphError'>>;
  votingProposalCreateds?: Resolver<Array<ResolversTypes['VotingProposalCreated']>, ParentType, ContextType, RequireFields<QueryvotingProposalCreatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  initialized?: SubscriptionResolver<Maybe<ResolversTypes['Initialized']>, "initialized", ParentType, ContextType, RequireFields<SubscriptioninitializedArgs, 'id' | 'subgraphError'>>;
  initializeds?: SubscriptionResolver<Array<ResolversTypes['Initialized']>, "initializeds", ParentType, ContextType, RequireFields<SubscriptioninitializedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  ownershipTransferred?: SubscriptionResolver<Maybe<ResolversTypes['OwnershipTransferred']>, "ownershipTransferred", ParentType, ContextType, RequireFields<SubscriptionownershipTransferredArgs, 'id' | 'subgraphError'>>;
  ownershipTransferreds?: SubscriptionResolver<Array<ResolversTypes['OwnershipTransferred']>, "ownershipTransferreds", ParentType, ContextType, RequireFields<SubscriptionownershipTransferredsArgs, 'skip' | 'first' | 'subgraphError'>>;
  voteCasted?: SubscriptionResolver<Maybe<ResolversTypes['VoteCasted']>, "voteCasted", ParentType, ContextType, RequireFields<SubscriptionvoteCastedArgs, 'id' | 'subgraphError'>>;
  voteCasteds?: SubscriptionResolver<Array<ResolversTypes['VoteCasted']>, "voteCasteds", ParentType, ContextType, RequireFields<SubscriptionvoteCastedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  votingConcluded?: SubscriptionResolver<Maybe<ResolversTypes['VotingConcluded']>, "votingConcluded", ParentType, ContextType, RequireFields<SubscriptionvotingConcludedArgs, 'id' | 'subgraphError'>>;
  votingConcludeds?: SubscriptionResolver<Array<ResolversTypes['VotingConcluded']>, "votingConcludeds", ParentType, ContextType, RequireFields<SubscriptionvotingConcludedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  votingProposalCreated?: SubscriptionResolver<Maybe<ResolversTypes['VotingProposalCreated']>, "votingProposalCreated", ParentType, ContextType, RequireFields<SubscriptionvotingProposalCreatedArgs, 'id' | 'subgraphError'>>;
  votingProposalCreateds?: SubscriptionResolver<Array<ResolversTypes['VotingProposalCreated']>, "votingProposalCreateds", ParentType, ContextType, RequireFields<SubscriptionvotingProposalCreatedsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type VoteCastedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['VoteCasted'] = ResolversParentTypes['VoteCasted']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  votingProposalId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  voteOption?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  voteCount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VotingConcludedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['VotingConcluded'] = ResolversParentTypes['VotingConcluded']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  votingProposalId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  yesVotes?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  noVotes?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VotingProposalCreatedResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['VotingProposalCreated'] = ResolversParentTypes['VotingProposalCreated']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  votingProposalId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  proposalHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  creationDate?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  conclusionDate?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockNumber?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  blockTimestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  transactionHash?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bytes?: GraphQLScalarType;
  Initialized?: InitializedResolvers<ContextType>;
  Int8?: GraphQLScalarType;
  OwnershipTransferred?: OwnershipTransferredResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  VoteCasted?: VoteCastedResolvers<ContextType>;
  VotingConcluded?: VotingConcludedResolvers<ContextType>;
  VotingProposalCreated?: VotingProposalCreatedResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = VotingSubgraphTypes.Context & BaseMeshContext;


const baseDir = pathModule.join(typeof __dirname === 'string' ? __dirname : '/', '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/voting_subgraph/introspectionSchema":
      return Promise.resolve(importedModule$0) as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const votingSubgraphTransforms = [];
const additionalTypeDefs = [] as any[];
const votingSubgraphHandler = new GraphqlHandler({
              name: "voting_subgraph",
              config: {"endpoint":"https://api.studio.thegraph.com/query/65949/voting_subgraph/v0.0.1"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("voting_subgraph"),
              logger: logger.child("voting_subgraph"),
              importFn,
            });
sources[0] = {
          name: 'voting_subgraph',
          handler: votingSubgraphHandler,
          transforms: votingSubgraphTransforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      {
        document: GetProposalsDocument,
        get rawSDL() {
          return printWithCache(GetProposalsDocument);
        },
        location: 'GetProposalsDocument.graphql'
      }
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));
export function getBuiltGraphSDK<TGlobalContext = any, TOperationContext = any>(globalContext?: TGlobalContext) {
  const sdkRequester$ = getBuiltGraphClient().then(({ sdkRequesterFactory }) => sdkRequesterFactory(globalContext));
  return getSdk<TOperationContext, TGlobalContext>((...args) => sdkRequester$.then(sdkRequester => sdkRequester(...args)));
}
export type GetProposalsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProposalsQuery = { votingProposalCreateds: Array<Pick<VotingProposalCreated, 'creator' | 'creationDate' | 'conclusionDate' | 'proposalHash' | 'votingProposalId'>> };


export const GetProposalsDocument = gql`
    query GetProposals {
  votingProposalCreateds(first: 10, where: {}, orderBy: conclusionDate) {
    creator
    creationDate
    conclusionDate
    proposalHash
    votingProposalId
  }
}
    ` as unknown as DocumentNode<GetProposalsQuery, GetProposalsQueryVariables>;


export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    GetProposals(variables?: GetProposalsQueryVariables, options?: C): Promise<GetProposalsQuery> {
      return requester<GetProposalsQuery, GetProposalsQueryVariables>(GetProposalsDocument, variables, options) as Promise<GetProposalsQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;