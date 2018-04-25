import { Directive, Attribute, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_ASYNC_VALIDATORS} from '@angular/forms';

@Directive({
  selector: 'input[flightCityAsync]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => AsyncCityValidatorDirective),
      multi: true
    }
  ]
})

export class AsyncCityValidatorDirective {

  public validate(c): Promise<any> {

    return new Promise<any>((resolve) => {  // Kommunikation mit Server simulieren

      setTimeout(() => {
        if (c.value == 'Graz'
          || c.value == 'Hamburg') {
          resolve({});
        }

        resolve({ flightCityAsync: true });
      }, 1000);
    });
  }
}
