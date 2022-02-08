import { ChainId } from "../../chain-utils/types";
import { abis } from "../abis";

export const market = {
  [ChainId.ETHEREUM_ROPSTEN]: {
    version: "1",
    abi: abis.Market,
    address: "0xfD4e94F8d1e3B6347E2C34076f9B6Af19cFafe04",
    name: "NFTMarket",
    chainId: ChainId.ETHEREUM_ROPSTEN,
  },
  [ChainId.ETHEREUM_MAINNET]: {
    version: "1",
    abi: abis.Market,
    address: "0xfD4e94F8d1e3B6347E2C34076f9B6Af19cFafe04", // TODO: Change when going to productions
    name: "NFTMarket",
    chainId: ChainId.ETHEREUM_MAINNET,
  },
};
