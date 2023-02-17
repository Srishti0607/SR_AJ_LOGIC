import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template-textarea-form',
  templateUrl: './template-textarea-form.component.html',
  styleUrls: ['./template-textarea-form.component.css']
})
export class TemplateTextareaFormComponent implements OnInit {
  productId: any = 0;
  productName: any;
  cost: any = 0;
  quantity: any = 0;
  billAmt: any;
  discount: any;
  netBillAmt: any;
  productFlag: boolean = false;
  productMsg: string = '';
  productNameFlag: boolean = false;
  productNameMsg: string = '';
  costFlag: boolean = false;
  costMsg: string = '';
  qtyFlag: boolean = false;
  qtyMsg: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  validate(opr){
    if(opr == 'productId'){
      (!this.productId)? (this.productFlag = true, this.productMsg = 'Product Id is Mandatory') : this.productId < 100 ? (this.productFlag = true, this.productMsg = 'Product ID should be greater than 100'): (this.productFlag = false,this.productMsg = '');
    }else if(opr == 'productName'){
      (!this.productName) ? (this.productNameFlag = true, this.productNameMsg = 'Product Name is Mandatory') : this.productName.length < 5 ? (this.productNameFlag = true, this.productNameMsg = 'Product Name Must be greater than 5'): (this.productNameFlag = false,this.productNameMsg = '');
    }else if(opr == 'cost'){
      (!this.cost) ? (this.costFlag = true, this.costMsg = 'Cost is Mandatory') : this.cost < 500 ? (this.costFlag = true, this.costMsg = 'Cost Must be greater than 500'): (this.costFlag = false,this.costMsg = '');
    }else {
      (!this.quantity) ? (this.qtyFlag = true, this.qtyMsg = 'Cost is Mandatory') : this.quantity < 5 || this.quantity > 20 ? (this.qtyFlag = true, this.qtyMsg = 'Quantity must be greater than 5 and less than 20'): (this.qtyFlag = false,this.qtyMsg = '');
    }
  }

  calculateVal(){
    this.billAmt = (this.cost * this.quantity);
    this.billAmt > 10000 ? this.discount = (10/100 * this.billAmt) : this.discount = (5/100 * this.billAmt);
    this.netBillAmt = (this.billAmt - this.discount);
  }

  checkBtnDisable(){
    if(!this.productFlag && !this.productNameFlag && !this.costFlag && !this.qtyFlag && this.productMsg == '' && this.productNameMsg == '' && this.costMsg == '' && this.qtyMsg == '' && this.productId != 0 && this.productName != '' && this.cost != 0 && this.quantity != 0){
      return false;
    }else{
      return true;
    }
  }

}
