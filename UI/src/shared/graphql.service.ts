import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
    providedIn: 'root'
})
export class GraphQlService {


    constructor(
        private apollo: Apollo
    ) { }

    get(query) {
        return this.apollo.query({
            query: gql`${query}`
        })
    }

    mutate(mutation, variables) {
        return this.apollo.mutate({
            mutation: gql`${mutation}`,
            variables
        })
    }
}

