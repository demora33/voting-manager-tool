import { ethers } from "hardhat";
import { mine } from "@nomicfoundation/hardhat-network-helpers";



export async function getCurrentBlock(display?: boolean): Promise<number> {
    let currentBlock = await ethers.provider.getBlockNumber();
    if (display) {
      console.log("Current BlockNumber: ", currentBlock);
    }
    return currentBlock;
  }

export async function mineSomeBlocks(amount: number): Promise<{
    previousBlock: Number;
    currentBlock: Number;
  }> {
    let previousBlock = await getCurrentBlock(true);
    console.log(`\nMining ${amount} block...\n`);
    await mine(amount);
    let currentBlock = await getCurrentBlock(true);
    return {
      previousBlock,
      currentBlock,
    };
}