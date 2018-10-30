import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/primeng';
import { ApolloModule, Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { CountriesComponent } from './countries.component';

@NgModule({
  exports: [ApolloModule, HttpLinkModule, CountriesComponent],
  imports: [
    CommonModule,
    DropdownModule
  ],
  declarations: [CountriesComponent]
})
export class CountriesModule {
  constructor (apollo: Apollo,
               httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({
        uri: 'https://countries.trevorblades.com/'
      }),
      cache: new InMemoryCache(),
    }, 'countries');
  }
}
