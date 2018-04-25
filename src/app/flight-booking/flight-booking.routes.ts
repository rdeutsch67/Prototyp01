import {FlightSearchComponent} from './flight-search/flight-search.component';
import {FlightSearchDetailComponent} from './flight-search-detail/flight-search-detail.component';
import {PassengerSearchComponent} from './passenger-search/passenger-search.component';
import {RouterModule, Routes} from '@angular/router';
import {FlightBookingComponent} from './flight-booking.component';
import {FlightEditComponent} from './flight-edit/flight-edit.component';
import {AuthChildGuard} from '../shared/auth/auth.child.guard';
import {LeaveComponentGuard} from '../shared/deactivation/leave-component-guard';
import {FlightResolver} from './services/flight.resolver';
import {AuthGuard} from '../shared/auth/auth.guard';
import {FlightSearchReactiveComponent} from './flight-search-reactive/flight-search-reactive.component';
import {FlightSearchMultistopComponent} from './flight-search-multistop/flight-search-multistop.component';


const FLIGHT_BOOKING_ROUTES: Routes = [
  {
    //path: 'flight-booking',
    path: '',
    component: FlightBookingComponent,
    canActivateChild: [AuthChildGuard],
    children: [
      {
        path: '',
        redirectTo: 'flight-search',
        pathMatch: 'full'
      },
      {
        path: 'flight-search',
        component: FlightSearchComponent
      },
      {
        path: 'flight-search-detail',
        component: FlightSearchDetailComponent
      },
      {
        path: 'flight-search-reactive',
        component: FlightSearchReactiveComponent
      },
      {
        path: 'flight-search-multistop',
        component: FlightSearchMultistopComponent
      },
      {
        path: 'passenger-search',
        component: PassengerSearchComponent
      },
      {
        path: 'flight-edit/:id',
        component: FlightEditComponent,
        canActivate: [AuthGuard],
        canDeactivate: [LeaveComponentGuard],
        data: {
          restricted: true
        },
        resolve: {
          flight: FlightResolver
        }
      }
    ]
  }
];

export let FlightBookingRouterModule = RouterModule.forChild(FLIGHT_BOOKING_ROUTES);


/*const FLIGHT_BOOKING_ROUTES: Routes = [
  {
    path: 'flight-search',
    component: FlightSearchComponent
  },
  {
    path: 'passenger-search',
    component: PassengerSearchComponent
  }
];

export const FlightBookingRouterModule = RouterModule.forChild(FLIGHT_BOOKING_ROUTES);*/
