import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthToText'
})
export class MonthToTextPipe implements PipeTransform {

  month= ["January","Febuary","March","April","May","June",
          "July","August","September","October","November","December",
          ];
  transform(value: number, ...args: unknown[]): unknown {
    return this.month[value-1];
  }

}
