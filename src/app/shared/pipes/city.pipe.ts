import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'city',
  pure: true
})

export class CityPipe implements PipeTransform {
  transform(value: any, fmt: string): any {
    // fmt: short, long
    let short, long;

    switch(value) {
      case 'Graz':
        short = 'GRZ';
        long = 'Flughafen Graz Thalerhof'
      break;
      case 'Hamburg':
        short = 'HAM';
        long = 'Airport Hamburg Fulsbüttel Helmut Schmidt';
      break;
      default:
        short = long = 'ROM';
    }

    if (fmt == 'long') return long;
    return short;
  }
}
