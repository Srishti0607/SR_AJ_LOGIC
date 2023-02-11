import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { LandingService } from '../../landing.service';

@Component({
  selector: 'app-net-sal-radio',
  templateUrl: './net-sal-radio.component.html',
  styleUrls: ['./net-sal-radio.component.css']
})
export class NetSalRadioComponent implements OnInit {
  taxObj: any = [];
  reactiveForm!: FormGroup;

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
      }
    })
  }

  calculateAmt(){
    if(this.reactiveForm.get('taxVal').value){
      if(this.reactiveForm.get('salary').value > 0){
        this.reactiveForm.get('allownceAmt').setValue(parseFloat((this.reactiveForm.get('salary').value * (this.reactiveForm.get('taxVal').value/100)).toFixed(2)));
        this.reactiveForm.get('netSal').setValue(parseFloat(this.reactiveForm.get('salary').value + this.reactiveForm.get('allownceAmt').value));
      }
      else{
      }
    }else{
    }
   
    


  }

}
