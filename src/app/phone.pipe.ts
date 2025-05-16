import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string): string {
    value = value.replace(/\D/g, '');
    if (value.length == 10) {
      return `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 10)}`;
    } else {
      return value;
    }
  }
}
