///<reference path="passenger-search/passenger-search.component.ts"/>
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FlightSearchDetailComponent} from './flight-search-detail/flight-search-detail.component';
import { FlightCardComponent } from './flight-card/flight-card.component';
import { PassengerSearchComponent } from './passenger-search/passenger-search.component';
import { FlightBookingRouterModule } from './flight-booking.routes';
import { FlightEditComponent } from './flight-edit/flight-edit.component';
import { FlightService } from './services/flight.service';
import { FlightBookingComponent} from './flight-booking.component';
import { FlightResolver} from './services/flight.resolver';
import { AuthGuard} from '../shared/auth/auth.guard';
import { FlightSearchReactiveComponent} from './flight-search-reactive/flight-search-reactive.component';
import {FlightSearchMultistopComponent} from './flight-search-multistop/flight-search-multistop.component';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    FlightBookingRouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    FlightSearchComponent,
    FlightSearchDetailComponent,
    FlightCardComponent,
    FlightEditComponent,
    FlightBookingComponent,
    FlightSearchReactiveComponent,
    FlightSearchMultistopComponent,
    PassengerSearchComponent
    // ,DateComponent
  ],
  providers: [
    FlightService,
    FlightResolver,
    AuthGuard
  ],
  exports: [
    // FlightSearchComponent,
    // FlightSearchDetailComponent,
    // PassengerSearchComponent,
    // DateComponent
  ]
})
export class FlightBookingModule { }
