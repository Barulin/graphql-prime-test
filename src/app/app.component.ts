import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
  rates: SelectItem[] = [];
  loadingrates = true;
  errorrates: any;
  countries: SelectItem[] = [];
  loadingcountries = true;
  errorcountries: any;
  selectedValue = 'val2';
  selectedRate: SelectItem | null = null;
  selection: SelectItem[];
  selectedCurrency = 'RUB';

  constructor(private apollo: Apollo) {
    this.selection = [
      {label: 'Select City', value: null},
      {label: 'New York', value: {id: 1, name: 'New York', code: 'NY'}},
      {label: 'Rome', value: {id:  2, name: 'Rome', code: 'RM'}},
      {label: 'London', value: {id: 3, name: 'London', code: 'LDN'}}
    ];
  }

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            rates(currency: "${this.selectedCurrency}") {
              currency
              rate
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
        if (result.data && result.data.rates) {
          // this.rates
        }
        console.log(result)
        this.rates = result.data.rates;
        this.loadingrates = result.loading;
        this.errorrates = result.errors;

      });

    this.apollo
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
        this.loadingcountries = result.loading;
        this.errorcountries = result.errors;
      });
  }

  changeCurrency(newCurrency: string) {
    this.selectedCurrency = newCurrency;
  }
}
