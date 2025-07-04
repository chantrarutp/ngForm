import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string): string {
    value = value.replace(/\D/g, '');

    value = value.substring(0, 10);

    if (value.length <= 3) {
      return value;
    } else if (value.length <= 6) {
      return `${value.slice(0, 3)}-${value.slice(3)}`;
    } else {
      return `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
    }
  }

}
