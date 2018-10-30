import { Component, OnInit } from '@angular/core';
import {Apollo, APOLLO_OPTIONS} from 'apollo-angular';
import gql from 'graphql-tag';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.less']
})
export class CountriesComponent implements OnInit {
  countries: SelectItem[] = [];
  selectedCountry: SelectItem | null = null;
  loadingCountries = true;
  errorCountries: any;

  constructor(private apollo: Apollo) {
    console.log(apollo);
  }

  ngOnInit() {
    this.apollo.use('countries')
      .watchQuery({
        query: gql`
          {
            countries {
              native
              emoji
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
      this.countries = result.data.countries;
      this.loadingCountries = result.loading;
      this.errorCountries = result.errors;
    });
  }

}
