import { action, makeObservable, observable, computed } from "mobx";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import { nftaddress, nftmarketaddress } from "../../config";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";

// TODO: Integrate BuyNFT Flow
class NFTStore {
  nftService;
  nftCreatingStatus;
  tokenIds = [];
  constructor(nftService) {
    makeObservable(this, {
      nftCreatingStatus: observable,
      createNFT: action.bound,
      tokenIds: observable,
      setNFTCreatingStatus: action.bound,
      updateCreatedTokenIds: action.bound,
      latestCreatedTokenId: computed,
    });

    this.nftService = nftService;
    this.nftCreatingStatus = false;
  }

  get latestCreatedTokenId() {
    return this.tokenIds.slice(-1);
  }

  updateCreatedTokenIds(tokenId) {
    this.tokenIds.push(tokenId);
  }

  setNFTCreatingStatus(status) {
    this.nftCreatingStatus = status;
  }
  async createNFT(url) {
    this.setNFTCreatingStatus(true);

    /* TODO: get signer and nftContract from utils*/

    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);

    const tokenId = await this.nftService.createNFT(contract, url);

    this.setNFTCreatingStatus(false);
    this.updateCreatedTokenIds(tokenId);

    return tokenId;
  }
}

export { NFTStore };
