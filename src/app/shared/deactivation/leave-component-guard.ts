import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {ComponentWithCanDeactivate} from './component-with-can-deactivate';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LeaveComponentGuard implements CanDeactivate<ComponentWithCanDeactivate> {

  canDeactivate(
    component: ComponentWithCanDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {

    // return component.canDeactivate();
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
