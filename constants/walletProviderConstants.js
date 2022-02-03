// @ts-ignore
import WalletConnectProvider from "@walletconnect/web3-provider";
// @ts-ignore
// import Torus from "@toruslabs/torus-embed";
// @ts-ignore
import WalletLink from "walletlink";

const infuraId = "b28b5d2dec194976b90c78dbd42cf649";

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId,
    },
  },
  walletlink: {
    package: WalletLink,
    options: {
      infuraId,
    },
  },
};
