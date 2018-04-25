import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AuthService} from '../../shared/auth/auth.service';

@Component({
  selector: 'app-passenger-search',
  templateUrl: './passenger-search.component.html',
  styleUrls: ['./passenger-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PassengerSearchComponent implements OnInit {

  name: string;

  constructor(authService: AuthService) {
    this.name = authService.userName;
  }

  ngOnInit() {
  }

}
