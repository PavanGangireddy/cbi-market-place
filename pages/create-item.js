/* pages/create-item.js */
import { useContext, useState } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { observer } from "mobx-react-lite";

import { nftaddress, nftmarketaddress } from "../config";
import Web3Modal from "web3modal";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/Market.sol/NFTMarket.json";
import { NFTStoreContext } from "../context/NFTStoreContext";

import { getIpfsUrl } from "../utils/ipfsClientUtils";

const CreateItem = observer(() => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
  });
  const nftStore = useContext(NFTStoreContext);
  const { createNFT, latestCreatedTokenId } = nftStore;
  const router = useRouter();

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const url = await getIpfsUrl(file);
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  async function createMarket() {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      const url = await getIpfsUrl(data);
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  async function createSale(url) {
    await createNFT(url);
    const price = ethers.utils.parseUnits(formInput.price, "ether");

    // TODO: get Signer and provider from utils
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    /* then list the item for sale on the marketplace */
    let contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    let listingPrice = await contract.getListingPrice();
    listingPrice = listingPrice.toString();

    let transaction = await contract.createMarketItem(
      nftaddress,
      latestCreatedTokenId,
      price,
      {
        value: listingPrice,
      }
    );
    await transaction.wait();
    router.push("/");
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
        />
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />
        <input type="file" name="Asset" className="my-4" onChange={onChange} />
        {fileUrl && <img className="rounded mt-4" width="350" src={fileUrl} />}
        <button
          onClick={createMarket}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
        >
          Create Digital Asset
        </button>
      </div>
    </div>
  );
});

export default CreateItem;
