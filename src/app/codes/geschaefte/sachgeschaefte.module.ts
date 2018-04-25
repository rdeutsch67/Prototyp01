import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SachgeschaefteComponent} from './sachgeschaefte.component';
import {AuthGuard} from '../../shared/auth/auth.guard';
import {NgModule} from '@angular/core';
import {GeschaefteService} from '../services/geschaefte.service';
import {CommonModule} from '@angular/common';
import {SachgeschaefteRouterModule} from './sachgeschaefte.routes';
import {SachgeschafteListeComponent} from './liste/sachgeschafte-liste.component';
import {SachgeschaeftDetailComponent} from './detail/sachgeschaeft-detail.component';
import {LeaveComponentGuard} from '../../shared/deactivation/leave-component-guard';
import {DialogService} from '../services/dialog.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SachgeschaefteRouterModule
  ],
  declarations: [
    SachgeschaefteComponent,
    SachgeschafteListeComponent,
    SachgeschaeftDetailComponent
  ],
  providers: [
    GeschaefteService,
    AuthGuard,
    LeaveComponentGuard,
    DialogService
  ],
  exports: [
  ]
})

export class SachgeschaefteModule { }
