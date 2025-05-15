import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'citizenID'
})
export class CitizenIDPipe implements PipeTransform {

  transform(value: string): string {
    if (!value || value.length !== 13 || !/^\d+$/.test(value)) {
      return value;
    }

    return `${value[0]}-${value.substring(1, 5)}-${value.substring(5, 10)}-${value.substring(10, 12)}-${value[12]}`;
  }
}
