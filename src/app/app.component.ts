import { Component } from '@angular/core';
import {GuardsCheckEnd, GuardsCheckStart, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html'
  /*styleUrls: ['./app.component.css']*/
})

/*
export class AppComponent  {

  showLoadingIndicator = false;

  constructor(
    private router: Router,
    // private logger: LoggerService
  ) {

    router.events
      .filter(e => e instanceof NavigationStart
        || e instanceof GuardsCheckEnd)
      .subscribe(event => {
        this.showLoadingIndicator = true;
      });

    router.events.filter(
      e => e instanceof NavigationEnd
        || e instanceof  NavigationError
        || e instanceof NavigationCancel
        || e instanceof GuardsCheckStart )
      .subscribe(event => {
        this.showLoadingIndicator = false;
      });

  }
}
*/


export class AppComponent {
  title = 'Flightbooking';

  public showWaitInfo: boolean = false;
  // public showLoadingIndicator = false;

  constructor(private router: Router) {
    router.events.subscribe(
      (event) => {

        console.debug('router-event', event);
        if (event instanceof NavigationStart) {
            this.showWaitInfo = true;
        }
        if (event instanceof NavigationEnd
          || event instanceof NavigationCancel
          || event instanceof NavigationError) {
          this.showWaitInfo = false;
        }
      }
    )
  }


}
