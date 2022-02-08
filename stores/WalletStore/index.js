import { action, makeObservable, observable, computed } from "mobx";
import { ethers } from "ethers";

import {
  connectWallet,
  getSignerFromConnection,
} from "../../utils/WalletUtils";

// getData = (state: State) => BaseWallet
// getError = (state: State) => string
// getNetwork = (state: State) =>
//   'mainnet' | 'ropsten' | 'rinkeby' | 'kovan' | 'localhost'
// getAddress = (state: State) => string
// isConnected = (state: State) => boolean
// isConnecting = (state: State) => boolean
// address: computed,

class WalletStore {
  isConnected = false;
  isConnecting;
  error;
  network;
  signer;
  userAddress;
  constructor() {
    makeObservable(this, {
      isConnected: observable,
      isConnecting: observable,
      userAddress: observable,
      error: observable,
      network: observable,
      signer: observable,
      chainId: computed,
      networkName: computed,
      connectAppToWallet: action.bound,
      setUserAddress: action.bound,
      setIsConnected: action.bound,
      setIsConnecting: action.bound,
      setSigner: action.bound,
      setError: action.bound,
      setNetwork: action.bound,
    });
  }

  get networkName() {
    return this.network.name;
  }

  get chainId() {
    return this.network.chainId;
  }

  setNetwork(network) {
    this.network = network;
  }

  setError(e) {
    this.error = e;
  }

  setIsConnected(isConnected) {
    this.isConnected = isConnected;
  }

  setIsConnecting(isConnecting) {
    this.isConnecting = isConnecting;
  }

  setUserAddress(address) {
    this.userAddress = address;
  }

  setSigner(signer) {
    this.signer = signer;
  }
  // ConnectWalletRequest - action
  // Handle Success or failure of FetchWalletRequest
  // FetchWalletRequest - action
  // success - wallet -
  /*
    address: "0xc1ecc681e260fdf5a541e69b58948b7c14e82e11"
    chainId: 80001
    network: "MATIC"
    networks: {ETHEREUM: {…}, MATIC: {…}}
    providerType: "injected"
  */
  // failure - ConnectWalletRequest failure action trigger
  async connectAppToWallet() {
    this.setIsConnecting(true);
    try {
      const connection = await connectWallet();
      console.log("connection", connection);
      console.log("connection", connection.selectedAddress);
      this.setUserAddress(connection.selectedAddress);
      this.setIsConnected(true);

      const signer = getSignerFromConnection(connection);

      this.setSigner(signer);
      const provider = new ethers.providers.Web3Provider(connection);

      const network = await provider.getNetwork();
      this.setNetwork(network);
    } catch (e) {
      this.setIsConnecting(false);
      this.setIsConnected(false);
      this.setError(e);
    }

    return this.signer;
  }
}

export { WalletStore };
