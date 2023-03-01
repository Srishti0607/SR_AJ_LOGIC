import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  @Input() AllProductsCount:number = 0;
  @Input() ElectronicsProductsCount:number = 0;
  @Input() JeweleryProductsCount:number = 0;
  @Input() MensProductsCount:number = 0;
  @Input() WomensProductsCount:number = 0;

  @Output() FilterClick:EventEmitter<string> = new EventEmitter<string>();

  CategoryName:string = '';

  onButtonClick(e:any){
    this.CategoryName = e.target.name;
    this.FilterClick.emit(this.CategoryName);
}

}
