import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LandingService } from '../services/landing.service';
import { Subscription } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bulk-update',
  templateUrl: './bulk-update.component.html',
  styleUrls: ['./bulk-update.component.css']
})
export class BulkUpdateComponent implements OnInit {
  customerForm: FormGroup; //form group 
  customerArray: any = [];
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  selectAll: boolean = false;
  idObj: any = [];
  strCSVId: string = '';

  constructor(private formBuilder: FormBuilder,private landingSrv: LandingService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      customerFormArray: this.formBuilder.array([]),
    });
    this.subscriptionsList.push(
      this.landingSrv.getDataToUpdate().subscribe((data: any) => {
        if (data) {
          const userCtrl = this.customerForm.get('customerFormArray') as FormArray;
          data.forEach(cust => {            
            userCtrl.push(this.createCustomerForm(cust));
          });
        }
      })
    );
  }

  createCustomerForm(customerData) {
    return this.formBuilder.group({
      id: [customerData.id],
      check:[false],
      CustName: [customerData.customerName, Validators.required],
      CustPosition: [customerData.position, Validators.required],
      CustCity: [customerData.city, Validators.required],
      CustState: [customerData.state, Validators.required]
    });
  }

  updateRecords(){
    console.log(JSON.stringify(this.customerForm.value["customerFormArray"]));
    this.subscriptionsList.push(
      this.landingSrv.bulkUpdateData(JSON.stringify(this.customerForm.value["customerFormArray"])).subscribe((data: any) => {
        this.customerForm = this.formBuilder.group({
          customerFormArray: this.formBuilder.array([]),
        });
        this.snackBar.open('Data updated successfully!!', '', {
          duration: 3000
        });
      })
    );
  }

  onAllSelectionChange(event: any) {
    this.selectAll = !this.selectAll;
    this.customerForm.value["customerFormArray"].forEach(data => {
      data['check'] = this.selectAll;
      if(this.selectAll){
        this.idObj.push(data.id);
      }else{
        this.idObj = [];
      }
    });
  }

  onSelectionChange(item) {
    if(item['check']){
    this.idObj.push(item.id);
    }else{
      this.selectAll= item['check'];
      const objIdRef = this.idObj.find(ele => ele === item.id);
      objIdRef && this.idObj.splice(this.idObj.indexOf(objIdRef), 1);
    }
  }

  bulkDelete(){
    this.strCSVId = this.idObj.join(',');
    this.subscriptionsList.push(
      this.landingSrv.bulkDeleteData(this.strCSVId).subscribe((data: any) => {       
        this.snackBar.open('Data deleted successfully!!', '', {
          duration: 3000
        });
      })
    );

  }

}
