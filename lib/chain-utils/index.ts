import { ChainName, ChainId } from "./types";

/**
 * Get the chain name by chain id
 * @alpha
 */
export const getChainName = (chainId) => {
  switch (chainId) {
    case ChainId.ETHEREUM_MAINNET:
      return ChainName.ETHEREUM_MAINNET;
    case ChainId.ETHEREUM_ROPSTEN:
      return ChainName.ETHEREUM_ROPSTEN;
    case ChainId.ETHEREUM_RINKEBY:
      return ChainName.ETHEREUM_RINKEBY;
    case ChainId.ETHEREUM_GOERLI:
      return ChainName.ETHEREUM_GOERLI;
    case ChainId.ETHEREUM_KOVAN:
      return ChainName.ETHEREUM_KOVAN;
    case ChainId.MATIC_MAINNET:
      return ChainName.MATIC_MAINNET;
    case ChainId.MATIC_MUMBAI:
      return ChainName.MATIC_MUMBAI;
    default:
      return null;
  }
};
/**
 * Get the chain name by chain id
 * @alpha
 */
export const getChainId = (chainName) => {
  switch (chainName) {
    case ChainName.ETHEREUM_MAINNET:
      return ChainId.ETHEREUM_MAINNET;
    case ChainName.ETHEREUM_ROPSTEN:
      return ChainId.ETHEREUM_ROPSTEN;
    case ChainName.ETHEREUM_RINKEBY:
      return ChainId.ETHEREUM_RINKEBY;
    case ChainName.ETHEREUM_GOERLI:
      return ChainId.ETHEREUM_GOERLI;
    case ChainName.ETHEREUM_KOVAN:
      return ChainId.ETHEREUM_KOVAN;
    case ChainName.MATIC_MAINNET:
      return ChainId.MATIC_MAINNET;
    case ChainName.MATIC_MUMBAI:
      return ChainId.MATIC_MUMBAI;
    default:
      return null;
  }
};
