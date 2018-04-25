import {Einheit} from '../../entities/codes';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {EinheitenService} from './einheiten.service';
import { Injectable } from '@angular/core';

@Injectable()
export class EinheitenResolver implements Resolve<Einheit> {
  constructor(private einheitenService: EinheitenService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    const code = route.params['code'];
    return this.einheitenService.findByCode(code);
  }
}
