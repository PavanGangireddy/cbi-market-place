class NFTService {
  createNFT = async (contract, url) => {
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    return tokenId;
  };
  // TODO: add BuyNFT
}

export { NFTService };
