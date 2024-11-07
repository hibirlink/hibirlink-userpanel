import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  from,
} from "@apollo/client/core";
import { getAuth } from "firebase/auth";
import { ApolloClients } from "@vue/apollo-composable";
import { useAppStore } from "~/store/store";
const default_auth_link = new ApolloLink((operation, forward) => {
  const token = useAppStore().token;
  if (token) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }
  return forward(operation);
});

export default defineNuxtPlugin((nuxtApp) => {
  const httpLink = createHttpLink({
    uri: "https://hibirlink.hasura.app/v1/graphql",
  });

  const apolloClient = new ApolloClient({
    link: from([default_auth_link, httpLink]),
    cache: new InMemoryCache(),
  });
  nuxtApp.vueApp.provide(ApolloClients, { default: apolloClient });
});
