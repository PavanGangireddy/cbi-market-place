import { ChainId } from "../chain-utils/types";

export enum ContractName {
  Market = "Market",
}

export type ContractData = {
  abi: object[];
  address: string;
  name: string;
  version: string;
  chainId: ChainId;
};

export interface EIPProvider {
  request: (reqArgs: { method: string; params?: any[] }) => Promise<any>;
  sendAsync?: (reqArgs: { method: string; params?: any[] }) => Promise<any>;
  send?: (method: string, params?: any[]) => Promise<any>;
}
export interface LegacyProvider {
  sendAsync?: (reqArgs: { method: string; params?: any[] }) => Promise<any>;
  send: (method: string, params: any[]) => Promise<any>;
}
// We need to create this Provider type to accomodate for the different popular provider implementations.
// All implementations differ sligthly, most notably defining params as `any[] | undefined` (web3x) and `any[]` (ethers)
export type Provider = EIPProvider | LegacyProvider;
