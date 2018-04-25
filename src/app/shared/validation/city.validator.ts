import {Directive, Attribute, forwardRef, Input} from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: 'input[flightCity]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CityValidatorDirective),
      multi: true
    }
  ]
})

export class CityValidatorDirective implements Validator{

  @Input() flightCity: string;

  public validate(c: AbstractControl): any {

    var cities = this.flightCity.split(',');
    if (cities.indexOf(c.value) > -1) {
      return {};
    }
    return {
      flightCity: true
    }

  }


  // public validate(c: AbstractControl): any {
  //
  //   if (c.value == 'Graz'
  //     || c.value == 'Hamburg'
  //     || c.value == 'Frankfurt'
  //     || c.value == 'Wien'
  //     || c.value == 'Mallorca') {
  //
  //     return {};
  //
  //   }
  //   return {
  //     flightCity: true
  //   }
  // }
}
