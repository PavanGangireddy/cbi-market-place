/* pages/my-assets.js */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";

import { nftmarketaddress, nftaddress } from "../config";

import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import {
  nftService,
  MAX_PAGE_SIZE,
  MAX_NFT_ITEMS_PER_PAGE,
} from "../services/NFTService";

const { fetchPaginatedTokens } = nftService;

export default function MyAssets() {
  const [nfts, setNfts] = useState([]);
  const [page, setPage] = useState(0);
  const [loadingState, setLoadingState] = useState();
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs(limit, offset) {
    const tokensList = await fetchPaginatedTokens(limit, offset);
    const items = await Promise.all(
      tokensList.data.tokens.map(async (i) => {
        const meta = await axios.get(i.contentURI);
        const image = meta.data.image;
        let item = {
          id: i.id,
          tokenId: i.tokenId,
          image: image.includes("ipfs://ipfs/")
            ? image.replace("ipfs://ipfs/", "https://ipfs.io/ipfs/")
            : image.replace("ipfs://", "https://ipfs.io/ipfs/"),
        };

        return item;
      })
    );

    setNfts([...nfts, ...items]);
    setLoadingState(false);
  }

  const fetchMore = () => {
    const updatedPage = page + 1;
    const offset = updatedPage * MAX_NFT_ITEMS_PER_PAGE;

    const limit = MAX_NFT_ITEMS_PER_PAGE;

    loadNFTs(limit, offset);
    setPage(updatedPage);
  };
  if (loadingState === false && !nfts.length)
    return <h1 className="py-10 px-20 text-3xl">No assets owned</h1>;

  return (
    <div className="flex justify-center">
      <div className="p-4">
        <p>Current Page: {page}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              {nft.image.includes(".mp4") ? (
                <video src={nft.image} />
              ) : (
                <img src={nft.image} className="rounded" />
              )}
            </div>
          ))}
          {loadingState ? (
            <>
              <div className="bg-blend-normal" />
              <h1>Loading</h1>
            </>
          ) : null}
          <button
            onClick={fetchMore}
            className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}
