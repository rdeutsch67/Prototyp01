import {Flight} from '../../entities/flight';
import {Component, NgModule} from '@angular/core';
import {Headers, URLSearchParams, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';

@Component({
  selector: 'flight-search-detail',
  templateUrl: './flight-search-detail.component.html',
  styleUrls: ['./flight-search-detail.component.css']
})

export class FlightSearchDetailComponent {

  from = 'Hamburg';
  to = 'Graz';
  flights: Array<Flight> = [];
  selectedFlight: Flight;
  myModifiedDate: string = (new Date()).toISOString();

  basket: object = {
    "3": true,
    "4": false,
    "5": true
  };

  // public myDate: string = (new Date()).toISOString();

  constructor(private http: Http) {
  }


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
