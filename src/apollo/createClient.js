import {
  ApolloClient, ApolloLink, HttpLink,
  InMemoryCache,
} from '@apollo/client';

import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

import _ from 'lodash';

const cache = new InMemoryCache({ addTypename: false });
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const createClient = (isUsingCache = false, defaultToken) => {
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      'access-token': defaultToken ,
      'Accept': 'application/json'
    },
  }));
  return new ApolloClient({
    link: authLink.concat(
      ApolloLink.from([
        onError(({
          graphQLErrors, networkError, response, operation, forward,
        }) => {
          console.log('graphQLErrors', graphQLErrors);
          
        }),
        new HttpLink({
          uri: 'http://localhost:3000/graphql',
          credentials: 'same-origin',
        }),
      ]),
    ),
    // *: name & version variables use for statistic purpose
   
    cache,
    defaultOptions: isUsingCache ? undefined : defaultOptions,
  });
};

export default createClient;
