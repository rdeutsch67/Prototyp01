import { Component } from '@angular/core';
import { Flight } from '../../entities/flight';
import { FlightService } from '../services/flight.service';
import {FormGroup, FormBuilder, Validators, ValidatorFn, FormArray} from '@angular/forms';
import {Headers, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';
import {CityReactiveValidatorDirective} from '../../shared/validation/city-reactive.validator';
import {CityReactiveAsyncValidator} from '../../shared/validation/city-reactive.async.validator';
import {MultistopValidator} from '../../shared/validation/multistop-validator';


@Component({
  selector: 'flight-search-multistop',
  templateUrl: './flight-search-multistop.component.html',
  styleUrls: ['./flight-search-multistop.component.css']
})

export class FlightSearchMultistopComponent {

  public flights: Array<Flight> = [];
  public selectedFlight: Flight;

  public filter: FormGroup;
  public validators: Array<ValidatorFn> = [];

  basket: object = {
    "3": true,
    "4": false,
    "5": true
  };

  public formDesc = [
    {
      label: 'Dyn Von',
      name: 'from'
    },
    {
      label: 'Dyn Nach',
      name: 'to'
    }
  ];

  constructor(private http: Http,
              private flightService: FlightService,
              private fb: FormBuilder) {

    this.filter = fb.group({
      'from': ['Hamburg', this.validators],
      'to': ['Graz', this.validators],
      'stopovers': fb.array([])
    });

    this.filter.get('stopovers').validator = MultistopValidator.validate;

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

  public addStopover(): void {
    let stopovers = this.filter.controls['stopovers'] as FormArray;
    stopovers.push(this.fb.group({
      'city': ['', this.validators],
      'duration': ['1']
    }));
  }

  public removeStopover(): void {
    let stopovers = this.filter.controls['stopovers'] as FormArray;
    stopovers.removeAt(stopovers.length - 1);
  }


}
