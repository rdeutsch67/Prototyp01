import { Component } from '@angular/core';
import { Flight } from '../../entities/flight';
import { FlightService } from '../services/flight.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Headers, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';
import {CityReactiveValidatorDirective} from '../../shared/validation/city-reactive.validator';
import {CityReactiveAsyncValidator} from '../../shared/validation/city-reactive.async.validator';


@Component({
  selector: 'flight-search-reactive',
  templateUrl: './flight-search-reactive.component.html',
  styleUrls: ['./flight-search-reactive.component.css']
})

export class FlightSearchReactiveComponent {

  public flights: Array<Flight> = [];
  public selectedFlight: Flight;
  public filter: FormGroup;

  basket: object = {
    "3": true,
    "4": false,
    "5": true
  };

  constructor(private http: Http,
              private flightService: FlightService,
              private fb: FormBuilder) {

    this.filter = fb.group({
      'from': [
        'Hamburg',
        [
          Validators.required,
          Validators.minLength(3)
          //CityReactiveValidatorDirective
        ],
        [
          CityReactiveAsyncValidator.validate
        ]
      ],
      'to': ['Graz']
    });

    this.filter.valueChanges.subscribe((e) => {
      // console.debug('Formular geändert', e);
    });

    this.filter.controls['from'].valueChanges.subscribe((e) => {
      // console.debug('Feld from geändert', e);
    });

  }

  search() {
    const url = 'http://www.angular-akademie.com/api/flight';

    const headers = new Headers();
    headers.set('Accept', 'text/json');

    const search = new URLSearchParams();

    const value = this.filter.value;

    search.set('from', value.from);
    search.set('to', value.to);

    this.http
      .get(url, {headers, search})
      .map(resp => resp.json())
      .subscribe(
        flights => {
          this.flights = flights;
        },
        err => {
          console.error(err);
        }
      );
  }
}
