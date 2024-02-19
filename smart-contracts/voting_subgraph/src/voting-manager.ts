import {
  Initialized as InitializedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  VoteCasted as VoteCastedEvent,
  VotingConcluded as VotingConcludedEvent,
  VotingProposalCreated as VotingProposalCreatedEvent
} from "../generated/VotingManager/VotingManager"
import {
  Initialized,
  OwnershipTransferred,
  VoteCasted,
  VotingConcluded,
  VotingProposalCreated
} from "../generated/schema"

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoteCasted(event: VoteCastedEvent): void {
  let entity = new VoteCasted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.votingProposalId = event.params.votingProposalId
  entity.voteOption = event.params.voteOption
  entity.voteCount = event.params.voteCount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVotingConcluded(event: VotingConcludedEvent): void {
  let entity = new VotingConcluded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.votingProposalId = event.params.votingProposalId
  entity.yesVotes = event.params.yesVotes
  entity.noVotes = event.params.noVotes

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVotingProposalCreated(
  event: VotingProposalCreatedEvent
): void {
  let entity = new VotingProposalCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.votingProposalId = event.params.votingProposalId
  entity.creator = event.params.creator
  entity.proposalHash = event.params.proposalHash
  entity.creationDate = event.params.creationDate
  entity.conclusionDate = event.params.conclusionDate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
