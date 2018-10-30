import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {IRegistration} from './model/i-registration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
  planets: SelectItem[] = [{label: 'Select your home planet', value: null}];
  selPlanet: SelectItem | null = null;
  races: SelectItem[] = [{label: 'Select your race', value: null}];
  selRace: SelectItem | null = null;

  flights: String[] = [];

  model: IRegistration;

  submitted = false;

  onSubmit() {
    console.log(this.submitted);
    this.submitted = true;
  }


  constructor(private apollo: Apollo) {
  }

  ngOnInit() {
    this.model = {
      name: null,
      age: null,
      planet: null,
      race: null,
      gender: ''
    }

    this.apollo
      .watchQuery({
        query: gql`
          {
            allPlanets {
              planets {
                name
                id
              }
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
        this.planets = this.planets.concat(result.data.allPlanets.planets.map(i => {
          return {label: i.name, value: i.id};
        }));
      });

    this.apollo
      .watchQuery({
        query: gql`
          {
            allSpecies {
              species {
                name
                id
              }
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
        this.races = this.races.concat(result.data.allSpecies.species.map(i => {
          return {label: i.name, value: i.id};
        }));
      });

    this.apollo
      .watchQuery({
        query: gql`
          {
            allStarships {
              starships {
                model
                name
                starshipClass
                passengers
              }
            }
            allPlanets {
              planets {
                name
              }
            }
          }
        `,
      })
      .valueChanges.subscribe(result => {
        this.flights = result.data.allStarships.starships.map(i => {
          const planets = result.data.allPlanets.planets;
          i.planet = planets[Math.floor(Math.random() * planets.length)].name;
          return i;
        });
      });
  }

  getSelectedPlanet() {
    return this.planets.find(i => i.value === this.model.planet).label;
  }

  getSelectedRace() {
    return this.races.find(i => i.value === this.model.race).label;
  }
}
