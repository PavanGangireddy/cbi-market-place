import { action, makeObservable, observable, computed } from "mobx";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";

import { nftaddress, nftmarketaddress } from "../../config";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../../artifacts/contracts/Market.sol/NFTMarket.json";

class MarketPlaceStore {
  marketPlaceService;
  itemsOnSale = []; // Handle Pagination
  itemsOnSaleLoadingStatus = false;
  currentPage = 0; // TODO: Integrate with PaginationStore

  constructor(marketPlaceService) {
    makeObservable(this, {
      currentPage: observable,
      itemsOnSaleLoadingStatus: observable,
      setItemsOnSaleLoadingStatus: action.bound,
      itemsOnSale: observable,
      updateItemsOnSale: action.bound,
      getMarketPlaceItemsOnSale: action.bound,
      setCurrentPage: action.bound,
    });

    this.marketPlaceService = marketPlaceService;
  }

  setCurrentPage(page) {
    this.currentPage = page;
  }
  updateItemsOnSale(items) {
    this.itemsOnSale.push(...items);
  }

  setItemsOnSaleLoadingStatus(status) {
    this.itemsOnSaleLoadingStatus = status;
  }
  async getMarketPlaceItemsOnSale(limit, offset) {
    this.setItemsOnSaleLoadingStatus(true);

    /* TODO: get signer and nftContract from utils*/
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rpc-mumbai.maticvigil.com"
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);

    const data = await this.marketPlaceService.fetchMarketItemsPaginated(
      limit,
      offset
    );

    const items = await Promise.all(
      data.data.marketItemCreateds.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: Number(i.tokenId),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );

    this.setItemsOnSaleLoadingStatus(false);
    this.updateItemsOnSale(items);
  }
}

export { MarketPlaceStore };
