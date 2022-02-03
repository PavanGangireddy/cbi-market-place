/* pages/index.js */
import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { observer } from "mobx-react-lite";

import { MAX_NFT_ITEMS_PER_PAGE } from "../constants/marketPlaceUIConstants";
import { nftaddress, nftmarketaddress } from "../config";

import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";
import { MarketPlaceStoreContext } from "../context/MarketPlaceStoreContext";
import { WalletStoreContext } from "../context/WalletStoreContext";

const Home = observer(() => {
  const marketPlaceStore = useContext(MarketPlaceStoreContext);
  const walletStore = useContext(WalletStoreContext);

  const {
    getMarketPlaceItemsOnSale,
    itemsOnSale,
    itemsOnSaleLoadingStatus,
    setCurrentPage,
    currentPage,
  } = marketPlaceStore;

  useEffect(() => {
    getMarketPlaceItemsOnSale();
  }, []);

  const buyNft = async (nft) => {
    // TODO: Optimise this after WalletStore state is changed
    const { connectAppToWallet, isConnected } = walletStore;
    const signer = await connectAppToWallet();
    console.log("🚀 ~ file: index.js ~ line 35 ~ buyNft ~ signer", signer);
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    console.log("🚀 ~ file: index.js ~ line 39 ~ buyNft ~ price", price);
    if (signer !== undefined) {
      const transaction = await contract.createMarketSale(
        nftaddress,
        nft.itemId,
        {
          value: price,
        }
      );
      await transaction.wait();
      getMarketPlaceItemsOnSale();
    } else {
      alert("wallet not connected");
    }
  };

  const fetchMore = () => {
    const updatedPage = currentPage + 1;
    const offset = updatedPage * MAX_NFT_ITEMS_PER_PAGE;

    const limit = MAX_NFT_ITEMS_PER_PAGE;

    getMarketPlaceItemsOnSale(limit, offset);
    setCurrentPage(updatedPage);
  };

  if (itemsOnSaleLoadingStatus === false && !itemsOnSale.length)
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <p>Current Page: {currentPage}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {itemsOnSale.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img src={nft.image} />
              <div className="p-4">
                <p
                  style={{ height: "64px" }}
                  className="text-2xl font-semibold"
                >
                  {nft.name}
                </p>
                <div style={{ height: "70px", overflow: "hidden" }}>
                  <p className="text-gray-400">{nft.description}</p>
                </div>
              </div>
              <div className="p-4 bg-black">
                <p className="text-2xl mb-4 font-bold text-white">
                  {nft.price} ETH
                </p>
                <button
                  className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
                  onClick={() => buyNft(nft)}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
          {itemsOnSaleLoadingStatus ? (
            <>
              <div className="bg-blend-normal" />
              <h1>Loading</h1>
            </>
          ) : null}
        </div>
        <button
          onClick={fetchMore}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
        >
          Load More
        </button>
      </div>
    </div>
  );
});

export default Home;
