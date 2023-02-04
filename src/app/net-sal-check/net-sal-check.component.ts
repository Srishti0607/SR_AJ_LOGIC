import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { LandingService } from '../services/landing.service';

@Component({
  selector: 'app-net-sal-check',
  templateUrl: './net-sal-check.component.html',
  styleUrls: ['./net-sal-check.component.css']
})
export class NetSalCheckComponent implements OnInit {
  taxObj: any = [];
  reactiveForm!: FormGroup;
  reactiveForm2!: FormGroup;
  taxObjSelected: any = [];
  totalTax: any = 0;
  taxObj1: any = [];

  constructor(private landingSrv: LandingService) { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      salary: new FormControl(0, [
        this.validateSalary
      ]),
      netSal: new FormControl(0),
      allownceAmt: new FormControl(0),
      taxVal: new FormControl('', [Validators.required]),
    });
    this.reactiveForm2 = new FormGroup({
      salary1: new FormControl(0, [
        this.validateSalary
      ]),
      netSal1: new FormControl(0),
      allownceAmt1: new FormControl(0),
      taxVal: new FormControl('', [Validators.required]),
    });
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

  calculateAmt(tax){
    let alloanceVal = 0;   
    if(!tax.checked){
      tax.checked = true;
        if(this.reactiveForm.get('salary').value > 0){
          alloanceVal = this.reactiveForm.get('allownceAmt').value + parseFloat((this.reactiveForm.get('salary').value * (tax.val/100)).toFixed(2));
          this.reactiveForm.get('allownceAmt').setValue(alloanceVal);
          this.reactiveForm.get('netSal').setValue(parseFloat(this.reactiveForm.get('salary').value + this.reactiveForm.get('allownceAmt').value));
        }
        else{
          this.taxObjSelected.push(tax);
        }
    }   
    else{
      tax.checked = false;
      if(this.reactiveForm.get('salary').value > 0){
        alloanceVal = this.reactiveForm.get('allownceAmt').value - parseFloat((this.reactiveForm.get('salary').value * (tax.val/100)).toFixed(2));
        this.reactiveForm.get('allownceAmt').setValue(alloanceVal);
        this.reactiveForm.get('netSal').setValue(parseFloat(this.reactiveForm.get('salary').value + this.reactiveForm.get('allownceAmt').value));
      }
      else{
        let index = this.taxObj.findIndex((data, index) => data.val === tax.val);
        this.taxObjSelected.splice(index,1);
      }
    }    
  }

  showAllowance(){  
    let totalTax = 0;
    this.taxObjSelected.forEach(taxData => {
      totalTax = totalTax + taxData.val;
    });
    this.reactiveForm.get('allownceAmt').setValue(parseFloat((this.reactiveForm.get('salary').value * (totalTax/100)).toFixed(2)));
    this.reactiveForm.get('netSal').setValue(parseFloat(this.reactiveForm.get('salary').value + this.reactiveForm.get('allownceAmt').value));
  }

  calculateNetSal(){
    this.reactiveForm2.get('allownceAmt1').setValue(parseFloat((this.reactiveForm2.get('salary1').value * (this.totalTax/100)).toFixed(2)));
    this.reactiveForm2.get('netSal1').setValue(parseFloat(this.reactiveForm2.get('salary1').value + this.reactiveForm2.get('allownceAmt1').value));
  }

  getTotalTax(tax){
    if(!tax.checked){
      tax.checked = true;
      this.totalTax = this.totalTax + tax.val;
    }   
    else{
      tax.checked = false;
    }    
  }
}
