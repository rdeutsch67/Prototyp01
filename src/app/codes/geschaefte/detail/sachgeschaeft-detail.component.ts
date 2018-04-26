import {Component, Inject, OnInit} from '@angular/core';
import {Einheit, Geschaeft} from '../../../entities/codes';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {DialogService} from '../../services/dialog.service';
import {EKOR_URL} from '../../../app.tokens';
import {EinheitenService} from '../../services/einheiten.service';
import {Http} from '@angular/http';
import {GeschaefteService} from '../../services/geschaefte.service';


@Component({
  selector: 'sachgeschaeft-detail',
  templateUrl: './sachgeschaeft-detail.component.html'
})

export class SachgeschaeftDetailComponent implements /* ComponentWithCanDeactivate, */OnInit {

  lfnr: number;
  mode: string;
  geschaeft: Geschaeft;
  geschaeftVorher: Geschaeft;
  editBez: string;
  modData: Array<Geschaeft> = [];
  dontShowExitWarning = false;
  goBackAfterDelete = false;

  exitWarning = {
    show: false,
    resolve: null
  };

  constructor(
    private geschaefteService: GeschaefteService,
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: { geschaeft: Geschaeft }) => {
        this.editBez = data.geschaeft.bezhgoffiziell;
        this.geschaeft = data.geschaeft;
        this.geschaeftVorher = Object.assign({}, this.geschaeft);
      });

    this.route.params.subscribe(p => {
      this.lfnr = p['lfnr'];
      this.mode = p['mode'];
    });

    if (this.mode === 'insert') {
      this.geschaeft = Object.assign({}, this.geschaeft);
      this.geschaeftVorher = null;
    }
  }

  postChanges() {

    /*if (this.mode === 'insert') {
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
    else {*/

      this.modData[0] = this.geschaeftVorher;
      this.modData[1] = this.geschaeft;

      if(JSON.stringify(this.modData[0]) != JSON.stringify(this.modData[1]))
      {
        this.geschaefteService
          .save(this.modData)
          .subscribe(
            geschaeft => {
              this.geschaeft = geschaeft;
              // this.geschaeftVorher = Object.assign({}, this.geschaeft);
              this.dontShowExitWarning = true;  // nach dem Speichern muss die CanDeactivatmeldung nicht mehr angezeigt werden!

            },
            (err) => {
              console.debug('Fehler beim Laden', err);
            }
          );
      }
    }

  /*}*/








  /*canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.geschaeft || this.geschaeft.bezhgoffiziell === this.editBez) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
*/

  decide(decision: boolean) {
    this.exitWarning.show = false;
    this.exitWarning.resolve(decision);
  }

  canDeactivate() {    /* keine Warnung anzeigen wenn dontShowExitWarning-Flag gesetzt ist oder die Daten nicht verändert wurden */
    if (this.dontShowExitWarning || this.goBackAfterDelete || (JSON.stringify(this.geschaeft) === JSON.stringify(this.geschaeftVorher))) {
      return true;
    } else {
      this.exitWarning.show = true;
      return new Promise((resolve) => {
        this.exitWarning.resolve = resolve;
      });
    }
  }

}
