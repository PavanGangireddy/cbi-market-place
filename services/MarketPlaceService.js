import { gql } from "@apollo/client";
import { apolloClient } from "../utils/apolloClientUtils";
import { MAX_NFT_ITEMS_PER_PAGE } from "../constants/marketPlaceUIConstants";

const marketPlaceItemsQuery = `
  query manyTokens($limit: Int!, $offset: Int!){
    marketItemCreateds(first: $limit, skip: $offset) {
      id
      itemId
      nftContract
      tokenId
      seller
      owner
      price
      sold
    }
  }
`;

class MarketPlaceService {
  fetchMarketItemsPaginated = (limit = MAX_NFT_ITEMS_PER_PAGE, offset = 0) => {
    return apolloClient.query({
      query: gql(marketPlaceItemsQuery),
      variables: {
        limit,
        offset,
      },
    });
  };

  createMarketSale = () => {};

  // fetchItemsCreated
  // fetchMyNFTs
}

export { MarketPlaceService };
