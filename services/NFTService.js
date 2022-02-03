import { apolloClient } from "../utils/apolloClientUtils";

const tokensPaginatedQuery = `
  query manyTokens($limit: Int!, $offset: Int!){
    tokens(first: $limit, skip: $offset) {
      id
      tokenID
      contentURI
      tokenIPFSPath
    }
  }
`;

export const MAX_NFT_ITEMS_PER_PAGE = 5;
export const MAX_PAGE_SIZE = 10000;

class NFTService {
  fetchPaginatedTokens = (limit = MAX_NFT_ITEMS_PER_PAGE, offset = 0) => {
    return apolloClient.query({
      query: gql(tokensPaginatedQuery),
      variables: {
        limit,
        offset,
      },
    });
  };

  createNFT = async (contract, url, signer) => {
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    return tokenId;
  };
}

export { NFTService };
