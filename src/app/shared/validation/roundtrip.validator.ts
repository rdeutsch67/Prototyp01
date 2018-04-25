import { Directive } from '@angular/core';
import { FormGroup, Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[flightRoundTrip]',
  providers: [{provide: NG_VALIDATORS, useExisting: RoundTripDirective, multi: true}]
})

export class RoundTripDirective implements Validator {

  validate(control: AbstractControl): any {

    const formGroup = <FormGroup> control;
    const fromCtrl = formGroup.controls['from'];
    const toCtrl = formGroup.controls['to'];

    if (!fromCtrl || !toCtrl) {
      return {};
    }

    const from = fromCtrl.value;
    const to = toCtrl.value;

    if (from === to) {
      return {
        'round-trip': {
          flightCity: from
        }
      };
    }
    return {};

  }

}

// import {Directive} from '@angular/core';
// import {AbstractControl, FormGroup, NG_VALIDATORS, Validator} from '@angular/forms';
//
// @Directive({
//   selector: '[flightRoundTrip]',
//   providers: [{provide: NG_VALIDATORS, useExisting: RoundTripDirective, multi:
//       true}]
// })
//
// export class RoundTripDirective implements Validator {
//
//   validate(control: AbstractControl): any {
//
//     let formGroup = <FormGroup> control;
//     let fromCtrl = formGroup.controls['from'];
//     let toCtrl = formGroup.controls['to'];
//
//     if (!fromCtrl || !toCtrl) {
//       return {};
//     }
//
//     let from = fromCtrl.value;
//     let to = toCtrl.value;
//
//     if (from === to) {
//       return {
//         'round-trip': {
//           flightCity: from
//         }
//       };
//     }
//     return {};
//   }
// }
