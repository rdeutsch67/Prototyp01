import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService} from '../shared/auth/auth.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent {
  constructor(private authService: AuthService, private route: ActivatedRoute) {
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout()
  }

  get userName() {
    return this.authService.userName;
  }
}

/*export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}*/
