import { ChainId } from "../../chain-utils/types";
import { ContractName, ContractData } from "../types";

import { market } from "./Market";

const contracts: Record<
  ContractName,
  Partial<Record<ChainId, ContractData>>
> = {
  [ContractName.Market]: market,
};

export function getContract(
  contractName: ContractName,
  chainId: ChainId
): ContractData {
  const contract = contracts[contractName];
  if (!contract) {
    throw new Error(`Could not get a valid contract for name: ${contractName}`);
  }

  if (!contract[chainId]) {
    throw new Error(
      `Could not get a valid contract for ${contractName} using chain ${chainId}`
    );
  }

  return contract[chainId]!;
}

export function getContractName(address: string): ContractName {
  for (const contractName in contracts) {
    for (const chainId in contracts[contractName]) {
      const contract = contracts[contractName][chainId];

      if (contract.address.toLowerCase() === address.toLowerCase()) {
        return contractName as ContractName;
      }
    }
  }
  throw new Error(`Could not get a valid contract name for address ${address}`);
}
