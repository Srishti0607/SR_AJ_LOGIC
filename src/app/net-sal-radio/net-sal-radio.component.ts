import { Component, OnInit } from '@angular/core';
import { LandingService } from '../services/landing.service';

@Component({
  selector: 'app-net-sal-radio',
  templateUrl: './net-sal-radio.component.html',
  styleUrls: ['./net-sal-radio.component.css']
})
export class NetSalRadioComponent implements OnInit {
  taxObj: any = [];
  salary: any = 0;
  netSal: any;
  allownceAmt: any;
  showError: boolean = false;
  taxVal: any;
  showTaxError: boolean = false;


  constructor(private landingSrv: LandingService) { }

  ngOnInit(): void {
    this.getTaxData();
  }

  getTaxData(){
    this.landingSrv.getTaxData().subscribe((data: any) => {
      if (data) {
       this.taxObj = data;
      }
    })
  }

  calculateAmt(){
    this.showTaxError = false;
    if(this.taxVal){
      if(this.salary > 0){
        this.showError = false;
        this.allownceAmt = parseFloat((this.salary * (this.taxVal/100)).toFixed(2));
        this.netSal = parseFloat(this.allownceAmt + this.salary);
      }
      else{
        this.showError = true;
      }
    }else{
      this.showTaxError = true;
    }
   
    


  }

}
