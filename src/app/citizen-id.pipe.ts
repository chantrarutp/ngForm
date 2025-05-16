import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'citizenID'
})
export class citizenID implements PipeTransform {

  transform(value: string): string {
    value = value.replace(/\D/g, '');
    if (value.length == 13) {
      return `${value.slice(0, 1)}-${value.slice(1, 5)}-${value.slice(5, 10)}-${value.slice(10, 12)}-${value.slice(12, 13)}`;
    } else {
      return value;
    }
  }
}
