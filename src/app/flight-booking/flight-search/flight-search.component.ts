import {Flight} from '../../entities/flight';
import {Component, NgModule} from '@angular/core';
import {Headers, URLSearchParams, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';
import {FlightClass, LuggageOption} from './flight-request';

@Component({
  selector: 'flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})

export class FlightSearchComponent {

  from = 'Hamburg';
  to = 'Graz';
  flights: Array<Flight> = [];
  selectedFlight: Flight;
  flightClass: FlightClass;
  nonstop: boolean;
  luggage: LuggageOption;

  basket: object = {
    "3": true,
    "4": false,
    "5": true
  };

  public luggageOptions: Array<LuggageOption>;
  public flightClasses: Array<FlightClass>;

  public myDate: string = (new Date()).toISOString();

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.luggageOptions = [
      { id: 0, name: 'No luggage' },
      { id: 1, name: '1 piece of luggage' },
      { id: 2, name: '2 pieces of luggage' }
    ];

    this.flightClasses = [
      { id: 1, name: '1st Class' },
      { id: 2, name: 'Business Class' },
      { id: 3, name: 'Economy Class' }
    ];
  }

  // function showResponse(resp: Response){
  //   cosole.debug('Status-Code', resp.status);
  //   cosole.debug('Status-Text', resp.statusText);
  //   cosole.debug('Content-Type', resp.headers.get('Content-Type'));
  //   cosole.debug('Alle Header-Namen', resp.headers.keys();
  //   cosole.debug('Nutzdaten als String', resp.text());
  // }

  search() {
    const url = 'http://www.angular-akademie.com/api/flight';

    const headers = new Headers();
    headers.set('Accept', 'text/json');

    const search = new URLSearchParams();
    search.set('from', this.from);
    search.set('to', this.to);

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

  select(f: Flight) {
    this.selectedFlight = f;
  }
}
