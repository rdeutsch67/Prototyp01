import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { FlightHistoryComponent } from './flight-history/flight-history.component';
import {AppRouterModule, APP_ROUTES_MODULE_PROVIDER} from './app.routes';
import {HomeComponent} from './home/home.component';
import {OAuthModule, OAuthService} from 'angular-oauth2-oidc';
import {BASE_URL, EKOR_URL} from './app.tokens';
import {SharedModule} from './shared/shared.module';
import {FormsModule} from '@angular/forms';
import {CodesComponent} from './codes/codes.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    SharedModule.forRoot(),
    AppRouterModule,
    OAuthModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    FlightHistoryComponent
  ],
  providers: [
    {provide: BASE_URL, useValue: 'http://www.angular.at'},
    /*{provide: EKOR_URL, useValue: 'http://62.202.27.138:11110'},*/
    {provide: EKOR_URL, useValue: 'http://localhost:8091'},
    APP_ROUTES_MODULE_PROVIDER
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }


