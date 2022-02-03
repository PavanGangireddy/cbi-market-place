import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { FOUNDATIONS_SUB_GRAPH_APIURL } from "../constants/apiConstants";

export const apolloClient = new ApolloClient({
  uri: FOUNDATIONS_SUB_GRAPH_APIURL,
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: "no-cors",
  },
});
