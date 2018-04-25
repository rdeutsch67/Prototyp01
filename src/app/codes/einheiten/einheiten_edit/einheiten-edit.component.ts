import {Component, Inject, Input, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ComponentWithCanDeactivate} from '../../../shared/deactivation/component-with-can-deactivate';
import {Einheit, HttpResonsetext} from '../../../entities/codes';
import {EinheitenService} from '../../services/einheiten.service';
import {Observable} from 'rxjs/Observable';
import {EKOR_URL} from '../../../app.tokens';
import {Headers, Http, URLSearchParams} from '@angular/http';

@Component({
  selector: 'einheiten-edit',
  templateUrl: './einheiten-edit.component.html'
})

export class EinheitenEditComponent implements /* ComponentWithCanDeactivate, */OnInit {

  @Input() item: Einheit;
  mode: string;
  code: string;
  myEinheit: Einheit;
  myEinheitOld: Einheit;
  einheit: Einheit;
  modData: Array<Einheit> = [];
  dontShowExitWarning = false;
  goBackAfterDelete = false;
  myHttpResponse: HttpResonsetext;


  exitWarning = {
    show: false,
    resolve: null
  };

  showDeleteConfirmationMessage = {
    show: false,
    resolve: null
  };

  constructor(private einheitenService: EinheitenService,
              private route: ActivatedRoute,
              private http: Http,
              @Inject(EKOR_URL) private ekorUrl: string) {
  }

  ngOnInit() {

    this.route.params.subscribe(p => {
      this.code = p['code'];
      this.mode = p['mode'];
    });
    if (this.mode === 'insert') {
      this.myEinheit = Object.assign({}, this.myEinheit);
      this.myEinheitOld = null;
    } else {
      this.route.data.subscribe((data) => {
        this.myEinheit = data['einheit'];
        // this.myEinheitOld = data['einheit'];
        this.myEinheitOld = Object.assign({}, this.myEinheit);
      });
    }
  }

  saveEinheit() {

    if (this.mode === 'insert') {
      this.einheitenService
        .insert(this.myEinheit)
        .subscribe(
          einheit => {
            this.einheit = einheit;
            this.myEinheitOld = Object.assign({}, this.einheit);
            this.dontShowExitWarning = true;  // nach dem Speichern muss die CanDeactivatmeldung nicht mehr angezeigt werden!
          },
          (err) => {
            console.debug('Fehler beim Laden', err);
          }
        );
    }
    else {

      this.modData[0] = this.myEinheitOld;
      this.modData[1] = this.myEinheit;

      // if (this.modData[0] != this.modData[1])
      if (JSON.stringify(this.modData[0]) != JSON.stringify(this.modData[1]))

        this.einheitenService
          .save(this.modData)
          .subscribe(
            einheit => {
              this.einheit = einheit;
              this.myEinheitOld = Object.assign({}, this.einheit);
              this.dontShowExitWarning = true;  // nach dem Speichern muss die CanDeactivatmeldung nicht mehr angezeigt werden!

            },
            (err) => {
              console.debug('Fehler beim Laden', err);
            }
          );
    }

  }

  deleteEinheit() {

    this.einheitenService
      .delEinheit('code', this.myEinheit.code)
      .subscribe(
        myHttpResponse => {
          this.myHttpResponse = myHttpResponse;
          this.showDeleteConfirmationMessage.show = true;  // nach dem Datensatzlöschen eine Meldung anzeigen
          return new Promise((resolve) => {
            this.showDeleteConfirmationMessage.resolve = resolve;
            this.goBackAfterDelete = true;
          });
        },
        (err) => {
          console.debug('Fehler beim Laden', err);
        }
      );
  }


  decide(decision: boolean) {
    this.exitWarning.show = false;
    this.exitWarning.resolve(decision);
  }

  messageOK(msgOK: boolean) {
    this.showDeleteConfirmationMessage.show = false;
    this.showDeleteConfirmationMessage.resolve(msgOK);
    this.myEinheit = Object.assign({}, null);
    this.myEinheitOld = null;
    // this.ngOnInit();
  }

  canDeactivate() {    /* keine Warnung anzeigen wenn dontShowExitWarning-Flag gesetzt ist oder die Daten nicht verändert wurden */
    if (this.dontShowExitWarning || this.goBackAfterDelete || (JSON.stringify(this.myEinheit) === JSON.stringify(this.myEinheitOld))) {
      return true;
    } else {
      this.exitWarning.show = true;
      return new Promise((resolve) => {
        this.exitWarning.resolve = resolve;
      });
    }
  }

}
