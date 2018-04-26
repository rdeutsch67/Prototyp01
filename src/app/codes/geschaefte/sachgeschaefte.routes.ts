import {SachgeschaefteComponent} from './sachgeschaefte.component';
import {SachgeschafteListeComponent} from './liste/sachgeschafte-liste.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SachgeschaeftDetailComponent} from './detail/sachgeschaeft-detail.component';
import {AuthGuard} from '../../shared/auth/auth.guard';
import {GeschaeftResolver} from '../services/geschaft.resolver';
import {AuthChildGuard} from '../../shared/auth/auth.child.guard';
import {LeaveComponentGuard} from '../../shared/deactivation/leave-component-guard';
import {EinheitenEditComponent} from '../einheiten/einheiten_edit/einheiten-edit.component';
import {EinheitenResolver} from '../services/einheiten.resolver';

export const sachgeschaefteRoutes: Routes = [
  {
    path: '',
    component: SachgeschaefteComponent,
    canActivateChild: [AuthChildGuard],
    // canDeactivate: [LeaveComponentGuard],
    children: [
      {
        path: '',
        component: SachgeschafteListeComponent,
        children: [
          {
            path: ':lfnr',
            component: SachgeschaeftDetailComponent,
            canDeactivate: [LeaveComponentGuard],
            resolve: {
              geschaeft: GeschaeftResolver
            }
          },
          {
            path: '',
            component: SachgeschaefteComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(sachgeschaefteRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
      ]
})

export class SachgeschaefteRouterModule { }
