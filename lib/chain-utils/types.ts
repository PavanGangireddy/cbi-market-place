/**
 * Different supported chain ids
 * @alpha
 */
export declare enum ChainId {
  ETHEREUM_MAINNET = 1,
  ETHEREUM_ROPSTEN = 3,
  ETHEREUM_RINKEBY = 4,
  ETHEREUM_GOERLI = 5,
  ETHEREUM_KOVAN = 42,
  MATIC_MAINNET = 137,
  MATIC_MUMBAI = 80001,
}

/**
 * Different supported chain names
 * @alpha
 */
export declare enum ChainName {
  ETHEREUM_MAINNET = "Ethereum Mainnet",
  ETHEREUM_ROPSTEN = "Ropsten",
  ETHEREUM_RINKEBY = "Rinkeby",
  ETHEREUM_GOERLI = "Goerli",
  ETHEREUM_KOVAN = "Kovan",
  MATIC_MAINNET = "Polygon",
  MATIC_MUMBAI = "Mumbai",
}
/**
 * Get chain id by chain name
 * @alpha
 */
export declare function getChainId(chainName: ChainName): ChainId | null;

/**
 * Get the chain name by chain id
 * @alpha
 */
export declare function getChainName(chainId: ChainId): ChainName | null;
