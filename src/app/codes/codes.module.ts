import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthGuard} from '../shared/auth/auth.guard';
import {EinheitenSearchComponent} from './einheiten/einheiten_search/einheiten-search.component';
import {CodesRouterModule} from './codes.routes';
import {CodesComponent} from './codes.component';
import {EinheitenEditComponent} from './einheiten/einheiten_edit/einheiten-edit.component';
import {EinheitenService} from './services/einheiten.service';
import {EinheitenResolver} from './services/einheiten.resolver';
import {GeschaefteService} from './services/geschaefte.service';
import {GeschaeftResolver} from './services/geschaft.resolver';
import {SachgeschaefteComponent} from './geschaefte/sachgeschaefte.component';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    CodesRouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    EinheitenSearchComponent,
    EinheitenEditComponent,
    CodesComponent
  ],
  providers: [
    EinheitenService,
    EinheitenResolver,
    GeschaefteService,
    GeschaeftResolver,
    AuthGuard
  ],
  exports: [
  ]
})

export class CodesModule { }
