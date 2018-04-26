import 'rxjs/add/operator/switchMap';
import {Component} from '@angular/core';
import {Geschaeft} from '../../../entities/codes';
import {GeschaefteService} from '../../services/geschaefte.service';
import {URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'sachgeschaefte-liste',
  templateUrl: './sachgeschafte-liste.component.html',
  styleUrls: ['./sachgeschaefte-liste.component.css']
})

export class SachgeschafteListeComponent {

  // geschaefte: Array<Geschaeft> = [];
  selectedGeschaeft: number;
  geschaefte: Observable<Geschaeft[]>;
  //geschaefte: Geschaeft[];
  selectedRow: number;
  setClickedRow: Function;

  constructor(
    private geschaefteService: GeschaefteService,
    private route: ActivatedRoute,
    private router: Router
  )  {
    this.setClickedRow = function(index) {
      this.selectedRow = index;
    };
  }

  /*ngOnInit() {
   // this.geschaefte = this.geschaefteService.selectAll();
    this.search();
  }*/

  ngOnInit() {
    this.geschaefte = this.route.paramMap
      .switchMap((params: ParamMap) => {
        this.selectedGeschaeft = +params.get('lfnr');
        return this.geschaefteService.selectAll();
      });
  }

  /*search() {
    const search = new URLSearchParams();

    this.geschaefteService
      .selectAll()
      .subscribe(
        geschaefte => {
          this.geschaefte = geschaefte;
        },
        (err) => {
          console.debug('Fehler beim Laden', err);
        }
      );

  }*/

  select(f: Geschaeft) {
    this.selectedGeschaeft = f.lfnr;
  }
}
