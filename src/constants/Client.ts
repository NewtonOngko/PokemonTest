import { ApolloClient, InMemoryCache } from "@apollo/react-hooks";

const Client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BASE_URL,
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
});

export default Client;
