import { Component } from '@angular/core';

@Component({
  selector: 'app-productscatalog',
  templateUrl: './productscatalog.component.html',
  styleUrls: ['./productscatalog.component.css']
})
export class ProductscatalogComponent {

  Products:any[] = [];
  AllProductsCount:number = 0;
  ElectronicsProductsCount:number = 0;
  JeweleryProductsCount:number = 0;
  MensProductsCount:number = 0;
  WomensProductsCount:number = 0;

  constructor() { }

  ngOnInit(): void {
    this.LoadProducts(`http://fakestoreapi.com/products`);
  }

  LoadProducts(url:string){

    fetch(url)
    .then(response => response.json())
    .then(data=>{
      this.Products = data;
      this.AllProductsCount = data.length;

      this.ElectronicsProductsCount = data.filter(function(product:any){
        return product.category=="electronics";
     }).length;

     this.JeweleryProductsCount = data.filter(function(product:any){
      return product.category=="jewelery";
   }).length;

   this.MensProductsCount = data.filter(function(product:any){
    return product.category=="men's clothing";
 }).length;

 this.WomensProductsCount = data.filter(function(product:any){
  return product.category=="women's clothing";
 }).length;

   });
    
  }


  FilterChanged(category:string) {
    // alert(category);
    if(category==='all') {
      this.LoadProducts(`http://fakestoreapi.com/products`);
    }
    else{
      fetch(`http://fakestoreapi.com/products/category/${category}`)
      .then(response=> response.json())
      .then(data=> {
        this.Products = data;
      })
    }

  }

}
