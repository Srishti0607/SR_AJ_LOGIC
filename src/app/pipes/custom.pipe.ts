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
  transform(items: any[], searchText: string, filterMetadata: any): any {
    if(!items) return [];
    if(!searchText) {
      filterMetadata.count = items.length;
      return items;
    }
    searchText = searchText.toLowerCase();
    let filteredItems = items.filter(function(item){
      return JSON.stringify(item).toLowerCase().includes(searchText);
  });
    filterMetadata.count = filteredItems.length;
    return filteredItems;
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

@Pipe({
  name: 'alphaSort',
  pure: false
})
export class AlphaSortPipe implements PipeTransform {

  transform(array: any[], args?: any): any {
    return array.slice().sort((a,b) => a.name.localeCompare(b.name));
  }

}

