import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  Initialized,
  OwnershipTransferred,
  VoteCasted,
  VotingConcluded,
  VotingProposalCreated
} from "../generated/VotingManager/VotingManager"

export function createInitializedEvent(version: BigInt): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(version)
    )
  )

  return initializedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createVoteCastedEvent(
  votingProposalId: BigInt,
  voteOption: i32,
  voteCount: BigInt
): VoteCasted {
  let voteCastedEvent = changetype<VoteCasted>(newMockEvent())

  voteCastedEvent.parameters = new Array()

  voteCastedEvent.parameters.push(
    new ethereum.EventParam(
      "votingProposalId",
      ethereum.Value.fromUnsignedBigInt(votingProposalId)
    )
  )
  voteCastedEvent.parameters.push(
    new ethereum.EventParam(
      "voteOption",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(voteOption))
    )
  )
  voteCastedEvent.parameters.push(
    new ethereum.EventParam(
      "voteCount",
      ethereum.Value.fromUnsignedBigInt(voteCount)
    )
  )

  return voteCastedEvent
}

export function createVotingConcludedEvent(
  votingProposalId: BigInt,
  yesVotes: BigInt,
  noVotes: BigInt
): VotingConcluded {
  let votingConcludedEvent = changetype<VotingConcluded>(newMockEvent())

  votingConcludedEvent.parameters = new Array()

  votingConcludedEvent.parameters.push(
    new ethereum.EventParam(
      "votingProposalId",
      ethereum.Value.fromUnsignedBigInt(votingProposalId)
    )
  )
  votingConcludedEvent.parameters.push(
    new ethereum.EventParam(
      "yesVotes",
      ethereum.Value.fromUnsignedBigInt(yesVotes)
    )
  )
  votingConcludedEvent.parameters.push(
    new ethereum.EventParam(
      "noVotes",
      ethereum.Value.fromUnsignedBigInt(noVotes)
    )
  )

  return votingConcludedEvent
}

export function createVotingProposalCreatedEvent(
  votingProposalId: BigInt,
  creator: Address,
  proposalHash: Bytes,
  creationDate: BigInt,
  conclusionDate: BigInt
): VotingProposalCreated {
  let votingProposalCreatedEvent = changetype<VotingProposalCreated>(
    newMockEvent()
  )

  votingProposalCreatedEvent.parameters = new Array()

  votingProposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "votingProposalId",
      ethereum.Value.fromUnsignedBigInt(votingProposalId)
    )
  )
  votingProposalCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  votingProposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalHash",
      ethereum.Value.fromFixedBytes(proposalHash)
    )
  )
  votingProposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "creationDate",
      ethereum.Value.fromUnsignedBigInt(creationDate)
    )
  )
  votingProposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "conclusionDate",
      ethereum.Value.fromUnsignedBigInt(conclusionDate)
    )
  )

  return votingProposalCreatedEvent
}
