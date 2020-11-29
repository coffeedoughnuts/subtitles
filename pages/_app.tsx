import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import Head from 'next/head'
import { useMemo } from 'react';
import '../styles/globals.css'

function createClient() {
  const ssr = typeof window === 'undefined'

  const httpLink = new HttpLink({
    uri: 'https://subtitles.hasura.app/v1/graphql'
  });

  if (ssr) {
    return new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
      ssrMode: true
    });
  }

  const wsLink = new WebSocketLink({
    uri: `ws://subtitles.hasura.app/v1/graphql`,
    options: {
      reconnect: true
    }
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
    ssrMode: false
  });

  return client
}

function App({ Component, pageProps }) {
  const client = useMemo(createClient, [typeof window === 'undefined'])
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
