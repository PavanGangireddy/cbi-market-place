import { create as ipfsHttpClient } from "ipfs-http-client";

const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

export const getIpfsUrl = async (file) => {
  const added = await client.add(file, {
    progress: (prog) => console.log(`received: ${prog}`),
  });
  const url = `https://ipfs.infura.io/ipfs/${added.path}`;
  return url;
};
