import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CustomPreloadingStrategy} from './shared/custom-preloading-strategy';
import {FlightHistoryComponent} from './flight-history/flight-history.component';
import {AuthChildGuard} from './shared/auth/auth.child.guard';
import {AuthLoadGuard} from './shared/auth/auth.load.guard';
import {CodesModule} from './codes/codes.module';
import {CodesComponent} from './codes/codes.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'flight-booking',
    canActivateChild: [AuthChildGuard],
    canLoad: [AuthLoadGuard],  /* hiermit wird das verzögerte Laden des FlightBooking-Modules unterdrückt */
    loadChildren: './flight-booking/flight-booking.module#FlightBookingModule',
    data: {
      preload: true
    }
  },
  {
    path: 'codes',
    canActivateChild: [AuthChildGuard],
    canLoad: [AuthLoadGuard],  /* hiermit wird das verzögerte Laden des Codes-Modules unterdrückt */
    loadChildren: './codes/codes.module#CodesModule',
    data: {
      preload: false
    }
  },
  {
    path: 'history',
    component: FlightHistoryComponent,
    outlet: 'aux'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

export const AppRouterModule = RouterModule.forRoot(APP_ROUTES, {
  preloadingStrategy: CustomPreloadingStrategy });

export const APP_ROUTES_MODULE_PROVIDER = [CustomPreloadingStrategy];
