import {Component, OnInit} from '@angular/core';
import {Geschaeft} from '../../../entities/codes';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {DialogService} from '../../services/dialog.service';


@Component({
  selector: 'sachgeschaeft-detail',
  templateUrl: './sachgeschaeft-detail.component.html'
})

export class SachgeschaeftDetailComponent implements /* ComponentWithCanDeactivate, */OnInit {

  geschaeft: Geschaeft;
  editBez: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.route.data
      .subscribe((data: { geschaeft: Geschaeft }) => {
        this.editBez = data.geschaeft.bezhgoffiziell;
        this.geschaeft = data.geschaeft;
      });
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.geschaeft || this.geschaeft.bezhgoffiziell === this.editBez) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

}
