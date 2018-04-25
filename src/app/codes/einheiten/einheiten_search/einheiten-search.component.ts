import {Einheit} from '../../../entities/codes';
import {Component, Inject, NgModule} from '@angular/core';
import {Headers, URLSearchParams, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Http} from '@angular/http';
import {EinheitenService} from '../../services/einheiten.service';
import {EKOR_URL} from '../../../app.tokens';

@Component({
  selector: 'einheiten-search',
  templateUrl: './einheiten-search.component.html',
  styleUrls: ['./einheiten-search.component.css']
})

export class EinheitenSearchComponent {

  select_codezeinheit = 'ZH001';
  einheiten: Array<Einheit> = [];
  selectedEinheit: Einheit;

  basket: object = {
    "3": true,
    "4": false,
    "5": true
  };

  /* constructor(private http: Http,  @Inject(EKOR_URL) private ekorUrl: string, private einheitenService: EinheitenService) { */
  constructor(private einheitenService: EinheitenService) {
  }

  ngOnInit() {
  }

  // function showResponse(resp: Response){
  //   cosole.debug('Status-Code', resp.status);
  //   cosole.debug('Status-Text', resp.statusText);
  //   cosole.debug('Content-Type', resp.headers.get('Content-Type'));
  //   cosole.debug('Alle Header-Namen', resp.headers.keys();
  //   cosole.debug('Nutzdaten als String', resp.text());
  // }

  search() {
    const search = new URLSearchParams();
    search.set('code', this.select_codezeinheit);

      this.einheitenService
        .findMulti(this.select_codezeinheit)
        .subscribe(
          einheiten => {
            this.einheiten = einheiten;
          },
          (err) => {
            console.debug('Fehler beim Laden', err);
          }
        );

  };


  select(f: Einheit) {
    this.selectedEinheit = f;
  }
}
