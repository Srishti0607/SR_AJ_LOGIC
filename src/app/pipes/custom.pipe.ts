import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
    name: 'capital',
  })
  export class CapitalPipe implements PipeTransform {
    transform(field: string): string {
     return field.toUpperCase();
    }
  }

@Pipe({
  name: 'fieldsort',
})
export class FieldAscSortPipe implements PipeTransform {
  transform(array: any, sortBy: string, order?: string): any[] {
    const sortOrder = order ? order : 'asc'; // setting default ascending order
   
     return orderBy(array, [sortBy], [sortOrder]);
     }
}

@Pipe({
  name: 'LockFilter'
})

export class SearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {

      if(!value)return null;
      if(!args)return value;

      args = args.toLowerCase();

      return value.filter(function(item){
          return JSON.stringify(item).toLowerCase().includes(args);
      });
  }
}

@Pipe({
  name: 'impureSort',
  pure: false
})
export class ImpureSortPipe implements PipeTransform {

  transform(array: number[], args?: any): any {
    return array.slice().sort((a: number, b: number) => b - a);
  }

}

