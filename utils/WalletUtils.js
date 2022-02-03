import Web3Modal from "web3modal";

import { ethers } from "ethers";

import { providerOptions } from "../constants/walletProviderConstants";

export const connectWallet = async () => {
  const web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
    providerOptions,
  });
  const connection = await web3Modal.connect();

  return connection;
};

export const getSignerFromConnection = (connection) => {
  const provider = new ethers.providers.Web3Provider(connection);

  const signer = provider.getSigner();
  return signer;
};
