import {AbstractControl, NG_VALIDATORS} from '@angular/forms';
import {Directive, forwardRef} from '@angular/core';

@Directive({
  selector: 'input[flightCityReactive]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CityReactiveValidatorDirective),
      multi: true
    }
  ]
})

export class CityReactiveValidatorDirective {

  static validate(control: AbstractControl): any {
    if (control.value == 'Graz'
      || control.value == 'Hamburg'
      || control.value == 'Frankfurt'
      || control.value == 'Berlin'
      || control.value == 'Wien') {
      return {};
    }
    return {
      city: true
    };
  }
}
