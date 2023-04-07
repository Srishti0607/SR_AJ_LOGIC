import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';
import { LandingService } from '../services/landing.service';
import { ToWords } from 'to-words';

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
  transform(items: any[], searchText: string, filterMetadata: any, sortOn: string, sortDir: any): any {
    searchText ? sortOn = '' : sortOn = sortOn;
    if (!items) return [];
    if (!sortOn) { } else {
      if (sortOn == 'User') {
        items.sort((a, b) => {
          a = a[sortOn].toLowerCase();
          b = b[sortOn].toLowerCase();
          return a.localeCompare(b) * sortDir;
        });
        return items;
      } else {
        if (sortDir == 1) {
          items.sort((a, b) => {
            return a[sortOn] - b[sortOn]
          });
          return items;
        } else {
          items.sort((a, b) => {
            return b[sortOn] - a[sortOn]
          });
          return items;

        }

      }
    }

    if (!searchText) {
      filterMetadata.count = items.length;
      filterMetadata.value = items;
      return items;
    }
    searchText = searchText.toLowerCase();
    let filteredItems = items.filter(function (item) {
      return JSON.stringify(Object.values(item)).toLowerCase().includes(searchText);
    });
    filterMetadata.count = filteredItems.length;
    filterMetadata.value = filteredItems
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
    return array.slice().sort((a, b) => a.name.localeCompare(b.name));
  }

}

@Pipe({
  name: 'convert'
})

export class ConvertPipe implements PipeTransform {

  constructor(private landingSrv: LandingService) { }
  transform(value: any, filterMetadata: any, from: any, to: any): any {
    let rate;
    if (!value || !from || !to) { return 0; } else {
      this.landingSrv.getRates().subscribe((data: any) => {
        if (data) {
          rate = data[0][from][0][to];
          let val = rate * value;
          filterMetadata.count = 0;
          filterMetadata.value = (rate * value);
          return val;
        }
      })
    }
  }
}

@Pipe({
  name: 'orderBy'
})

export class OrderByPipe implements PipeTransform {

  transform(items: any[], userColName: string, sortUser: string, authColName: string, sortAuth: string, mobileColName: string, sortMobile: string, colClicked: string): any {
    if (colClicked == 'User') {
      items.sort((a, b) => {
        a = a[userColName].toLowerCase();
        b = b[userColName].toLowerCase();
        let sortDir = sortUser == 'asc' ? 1 : -1;
        return a.localeCompare(b) * sortDir;
      });
      return items;
    } else if (colClicked == 'Auth') {
      items.sort((a, b) => {
        return sortAuth == 'asc' ? a[authColName] - b[authColName] : b[authColName] - a[authColName];
      });
      return items;
    } else {
      items.sort((a, b) => {
        return sortMobile == 'asc' ? a[mobileColName] - b[mobileColName] : b[mobileColName] - a[mobileColName];
      });
      return items;
    }

  }  
}

@Pipe({
  name: 'numberToWords'
})

export class NumberToWordsPipe implements PipeTransform {

  transform(value: any): any {
    if (value && isInteger(value)){
      const toWords = new ToWords();
      return toWords.convert(value,{ currency: true });
    }
     
  return value; 
  }

  
}

const isInteger = function(x: any) {
  return x % 1 === 0;
}

