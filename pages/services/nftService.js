import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const APIURL =
  "https://api.thegraph.com/subgraphs/name/pavangangireddy/foundationsubgraph";

const tokensQuery = `
  query {
    tokens(first: 5) {
      id
      tokenID
      contentURI
      tokenIPFSPath
    }
  }
`;

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

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: "no-cors",
  },
});

const fetchFirstFiveTokens = () =>
  client.query({
    query: gql(tokensQuery),
  });

export const MAX_NFT_ITEMS_PER_PAGE = 5;
export const MAX_PAGE_SIZE = 10000;

const fetchPaginatedTokens = (limit = MAX_NFT_ITEMS_PER_PAGE, offset = 0) => {
  return client.query({
    query: gql(tokensPaginatedQuery),
    variables: {
      limit,
      offset,
    },
  });
};
export { fetchFirstFiveTokens, fetchPaginatedTokens };
