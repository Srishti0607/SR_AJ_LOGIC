import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LandingService } from '../services/landing.service';
import { Subscription } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bulk-insert',
  templateUrl: './bulk-insert.component.html',
  styleUrls: ['./bulk-insert.component.css']
})
export class BulkInsertComponent implements OnInit {
  customerForm: FormGroup; //form group 
  customerArray: any = [];
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls

  constructor(private formBuilder: FormBuilder, private landingSrv: LandingService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      customerFormArray: this.formBuilder.array([]),
    });
    this.addNewRow();
  }

  createCustomerForm(customerData) {
    return this.formBuilder.group({
      CustName: [customerData.name, Validators.required],
      CustPosition: [customerData.position, Validators.required],
      CustCity: [customerData.city, Validators.required],
      CustState: [customerData.state, Validators.required]
    });
  }

  addNewRow() {
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

  deleteRow(index) {
    const userCtrl = this.customerForm.get('customerFormArray') as FormArray;
    userCtrl.removeAt(index);
  }

  bulkInsert() {
    console.log(JSON.stringify(this.customerForm.value["customerFormArray"]));
    this.createXML();
    this.subscriptionsList.push(
      this.landingSrv.bulkInsertData(JSON.stringify(this.customerForm.value["customerFormArray"])).subscribe((data: any) => {
        this.customerForm = this.formBuilder.group({
          customerFormArray: this.formBuilder.array([]),
        });
        this.addNewRow();
        this.snackBar.open('Data inserted successfully!!', '', {
          duration: 3000
        });
      })
    );
  }

  createXML(){
    const xmlDoc = document.implementation.createDocument(null, "root", null);
    const rootNode = xmlDoc.querySelector("root");
    this.customerForm.value["customerFormArray"].forEach(cust => {
      const rowNode = xmlDoc.createElement("row");
      rowNode.setAttribute('Name', cust.CustName);
      rowNode.setAttribute('Position', cust.CustPosition);
      rowNode.setAttribute('City', cust.CustCity);
      rowNode.setAttribute('State', cust.CustState);
      rootNode.appendChild(rowNode);
    });
    const serializer = new XMLSerializer();
    const xmlString = serializer.serializeToString(xmlDoc);
    console.log(xmlString);    
  }
}
