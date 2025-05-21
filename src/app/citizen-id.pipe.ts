import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'citizenID'
})
export class citizenID implements PipeTransform {

  transform(value: string): string {
    value = value.replace(/\D/g, '');

    value = value.substring(0, 13);

    const parts = [
      value.slice(0, 1),
      value.slice(1, 5),
      value.slice(5, 10),
      value.slice(10, 12),
      value.slice(12, 13)
    ].filter(part => part);

    return parts.join('-');
  }
}