import {Observable} from 'rxjs/Observable';

export interface ComponentWithCanDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
