import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { LandingService } from '../services/landing.service';

@Component({
  selector: 'app-check-template',
  templateUrl: './check-template.component.html',
  styleUrls: ['./check-template.component.css']
})
export class CheckTemplateComponent implements OnInit {
  taxObj: any = [];
  taxObjSelected: any = [];
  totalTax: any = 0;
  taxObj1: any = [];
  salary:any = 0;
  netSal: any;
  allownceAmt: number = 0;
  taxVal:any;
  salary1: any = 0;
  netSal1: any;
  allownceAmt1: any;

  constructor(private landingSrv: LandingService) { }

  ngOnInit(): void {
    this.getTaxData();
  }

  validateSalary(control: AbstractControl) :  { [key: string]: boolean } | null{
    if(!control.value){
      return {'greaterThanZeroRequired': true}
    }else{
      if(control.value == 0){
        return {'greaterThanZeroRequired': true}
       }else{
       return {'greaterThanZeroRequired': false}
       }
    }
  }

  getTaxData(){
    this.landingSrv.getTaxData().subscribe((data: any) => {
      if (data) {
       this.taxObj = data;
       this.taxObj1 = JSON.parse(JSON.stringify(this.taxObj));
       this.taxObj.forEach(data => {
        data['checked'] = false;
      });
      this.taxObj1.forEach(data => {
        data['checked'] = false;
      });
      }
    })
  }

  calculateAmt(event,tax){
    let alloanceVal = 0;   
    if(!tax.checked){
      this.taxObjSelected.push(tax);
      tax.checked = event.currentTarget.checked;
        if(this.salary > 0){
          alloanceVal = this.allownceAmt + parseFloat((this.salary * (tax.val/100)).toFixed(2));
          this.allownceAmt = alloanceVal;
          this.netSal = parseFloat(this.salary + this.allownceAmt);
        }    
    }   
    else{
      tax.checked = event.currentTarget.checked;
      let index = this.taxObj.findIndex((data, index) => data.val === tax.val);
      this.taxObjSelected.splice(index,1);
      if(this.salary > 0){
        alloanceVal = this.allownceAmt - parseFloat((this.salary * (tax.val/100)).toFixed(2));
        this.allownceAmt = alloanceVal;
        this.netSal = parseFloat(this.salary + this.allownceAmt);
      }
    }    
  }

  showAllowance(){  
    let totalTax = 0;    
    this.taxObjSelected.forEach(taxData => {
      totalTax = totalTax + taxData.val;
    });
    this.allownceAmt = (parseFloat((this.salary * (totalTax/100)).toFixed(2)));
    this.netSal = parseFloat(this.salary + this.allownceAmt);
  }

  calculateNetSal(){
    this.allownceAmt1 = parseFloat((this.salary1 * (this.totalTax/100)).toFixed(2));
    this.netSal1 = parseFloat(this.salary1 + this.allownceAmt1);
  }

  getTotalTax(event,tax){
    if(!tax.checked){
      tax.checked = event.currentTarget.checked;;
      this.totalTax = this.totalTax + tax.val;
    }   
    else{
      tax.checked = event.currentTarget.checked;
      this.totalTax = this.totalTax - tax.val;
    }    
  }

}
