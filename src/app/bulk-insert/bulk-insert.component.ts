import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LandingService } from '../services/landing.service';
import { Subscription } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';
import * as JsonToXML from "js2xmlparser";

@Component({
  selector: 'app-bulk-insert',
  templateUrl: './bulk-insert.component.html',
  styleUrls: ['./bulk-insert.component.css']
})
export class BulkInsertComponent implements OnInit {
  customerForm: FormGroup; //form group 
  customerArray: any = [];
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls

  constructor(private formBuilder: FormBuilder,private landingSrv: LandingService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      customerFormArray: this.formBuilder.array([]),
    });
   this.addNewRow();
  }

  createCustomerForm(customerData){
    return this.formBuilder.group({
      CustName: [customerData.name, Validators.required],
      CustPosition: [customerData.position, Validators.required],
      CustCity: [customerData.city, Validators.required],
      CustState: [customerData.state, Validators.required]
    });
  }

  addNewRow(){
    const userCtrl = this.customerForm.get('customerFormArray') as FormArray;   
    let dataToPush = {
      name: '',
      position: '',
      city: '',
      state: ''
    }
    this.customerArray.push(dataToPush);     
    userCtrl.push(this.createCustomerForm(this.customerArray));
  }

  deleteRow(index){
    const userCtrl = this.customerForm.get('customerFormArray') as FormArray; 
    userCtrl.removeAt(index);
  }

  bulkInsert(){
    console.log(this.customerForm.value["customerFormArray"]);
    console.log(JsonToXML.parse("Users", this.customerForm.value["customerFormArray"]));
    // this.subscriptionsList.push(
    //   this.landingSrv.bulkInsertData(this.customerForm.value["customerFormArray"]).subscribe((data: any) => {
    //     this.snackBar.open('Data inserted successfully!!', '', {
    //       duration: 3000
    //     });
    //   })
    // );
  }
}
