import {Einheit, Geschaeft} from '../../entities/codes';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {GeschaefteService} from './geschaefte.service';

@Injectable()
export class GeschaeftResolver implements Resolve<Geschaeft> {
  constructor(private geschaefteService: GeschaefteService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    const lfnr = route.params['lfnr'];
    return this.geschaefteService.findByLfnr(lfnr);
  }
}
