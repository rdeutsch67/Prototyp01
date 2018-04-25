import {RouterModule, Routes} from '@angular/router';
import {CodesComponent} from './codes.component';
import {AuthChildGuard} from '../shared/auth/auth.child.guard';
import {EinheitenSearchComponent} from './einheiten/einheiten_search/einheiten-search.component';
import {LeaveComponentGuard} from '../shared/deactivation/leave-component-guard';
import {AuthGuard} from '../shared/auth/auth.guard';
import {EinheitenEditComponent} from './einheiten/einheiten_edit/einheiten-edit.component';
import {EinheitenResolver} from './services/einheiten.resolver';
import {SachgeschaefteComponent} from './geschaefte/sachgeschaefte.component';


const CODES_ROUTES: Routes = [
  {
    path: '',
    component: CodesComponent,
    canActivateChild: [AuthChildGuard],
    children: [
      {
        path: '',
        redirectTo: 'einheiten-search',
        pathMatch: 'full'
      },
      {
        path: 'einheiten-search',
        component: EinheitenSearchComponent
      },
      {
        path: 'einheiten-edit/:code',
        component: EinheitenEditComponent,
        canActivate: [AuthGuard],
        canDeactivate: [LeaveComponentGuard],
        data: {
          restricted: true
        },
        resolve: {
          einheit: EinheitenResolver
        }
      },
      {
        path: 'einheiten-insert/:mode',
        component: EinheitenEditComponent,
        canActivate: [AuthGuard],
        canDeactivate: [LeaveComponentGuard]
      },
      {
        path: 'einheiten-delete',
        component: EinheitenEditComponent,
        canActivate: [AuthGuard],
        canDeactivate: [LeaveComponentGuard]
      }/*,
      {
        path: 'sachgeschaefte',
        component: SachgeschaefteComponent,
        canActivate: [AuthGuard],
        canDeactivate: [LeaveComponentGuard]
      }*/,
      {
        path: 'sachgeschaefte',
        loadChildren: 'app/codes/geschaefte/sachgeschaefte.module#SachgeschaefteModule',
        data: { preload: true }
      }
    ]
  }
];

export let CodesRouterModule = RouterModule.forChild(CODES_ROUTES);


