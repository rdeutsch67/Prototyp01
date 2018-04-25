import { Directive, Attribute, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_ASYNC_VALIDATORS} from '@angular/forms';

@Directive({
  selector: 'input[flightCityAsyncReactive]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => CityReactiveAsyncValidator),
      multi: true
    }
  ]
})

// export class AsyncCityValidatorDirective {
//
//   public validate(c): Promise<any> {
//
//     return new Promise<any>((resolve) => {  // Kommunikation mit Server simulieren
//
//       setTimeout(() => {
//         if (c.value == 'Graz'
//           || c.value == 'Hamburg') {
//           resolve({});
//         }
//
//         resolve({ flightCityAsync: true });
//       }, 1000);
//     });
//   }
// }

export class CityReactiveAsyncValidator {

  static validate(control: AbstractControl): Promise<any> {

    return new Promise((resolve) => {

      setTimeout(
        () => {
          if (control.value == 'Graz'
            || control.value == 'Hamburg'
            || control.value == 'Frankfurt'
            || control.value == 'Wien') {
            resolve({});
          }
          resolve({
            //'cityAsync': true
            cityAsync: true
          });
        },
        300
      );
    });
  }
}
