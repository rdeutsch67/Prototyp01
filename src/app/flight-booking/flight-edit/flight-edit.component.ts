import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Flight} from "../../entities/flight";
import {FlightService} from "../services/flight.service";
import {ComponentWithCanDeactivate} from '../../shared/deactivation/component-with-can-deactivate';

@Component({
  selector: 'flight-edit',
  templateUrl: './flight-edit.component.html'
})

export class FlightEditComponent implements /* ComponentWithCanDeactivate, */ OnInit {

  id: string;
  flight: Flight;

  constructor(private route: ActivatedRoute, private flightService: FlightService) {
    route.params.subscribe(p => {
      this.id = p['id'];
    });
    route.data.subscribe((data) => {
      this.flight = data['flight'];
    })
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.id = p['id'];

      this.flightService.findById(this.id)
        .subscribe(
          (flight: Flight) => {
            this.flight = flight;
          },
          (err) => {
            console.debug('Fehler beim Laden', err);
          }
        );
    });
  }

  exitWarning = {
    show: false,
    resolve: null
  }

  decide(decision: boolean) {
    this.exitWarning.show = false;
    this.exitWarning.resolve(decision);
  }

  canDeactivate() {
    this.exitWarning.show = true;
    return new Promise((resolve) => {
      this.exitWarning.resolve = resolve;
    });
  }

}
