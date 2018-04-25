import {Component} from '@angular/core';
import {GeschaefteService} from '../services/geschaefte.service';
import {Router, RouterModule, Routes} from '@angular/router';

@Component({
  // selector: 'sachgeschaefte',
  template:  `
    <router-outlet></router-outlet>        
  `,
  providers:  [GeschaefteService]
})

export class SachgeschaefteComponent {

}
