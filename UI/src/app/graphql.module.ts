import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {  Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';

const uri = 'http://localhost:4000/graphql'; // <-- add the URL of the GraphQL server here

export function provideApollo(httpLink: HttpLink) {
  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8'
    }
  }));

  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem('accesstoken') || localStorage.getItem('token');
  const auth = setContext((operation, context) => ({
    headers: {
      Authorization: `Bearer ${token}`
    },
  }));

  const link = ApolloLink.from([basic, auth, httpLink.create({ uri })]);
  const cache = new InMemoryCache();

  return {
    link,
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    }
  }
}


// export function createApollo(httpLink: HttpLink) {
//   return {
//     link: httpLink.create({ uri }),
//     cache: new InMemoryCache(),
//     defaultOptions: {
//       watchQuery: {
//         fetchPolicy: 'no-cache',
//         errorPolicy: 'ignore',
//       },
//       query: {
//         fetchPolicy: 'no-cache',
//         errorPolicy: 'all',
//       },
//     }
//   };
// }

@NgModule({
  exports: [ HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: provideApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
