import { Component, OnInit } from '@angular/core';
import { LandingService } from '../services/landing.service';
import { Subscription } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bulk-delete',
  templateUrl: './bulk-delete.component.html',
  styleUrls: ['./bulk-delete.component.css']
})
export class BulkDeleteComponent implements OnInit {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  dataToDelObj: any = [];
  dataToDelCheckBoxObj: any = [];
  itemSelectedFromRadio: any;
  idObj: any = [];
  strCSVId: string = '';
  reactiveForm!: FormGroup;

  constructor(private landingSrv: LandingService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      selectAll: new FormControl(false)
    });
    this.getDetailsToDelete();
    this.getDetailsToDeleteCheck();
  }

  getDetailsToDelete() {
    this.subscriptionsList.push(
      this.landingSrv.getDataToDelete().subscribe((data: any) => {
        if (data) {
            this.dataToDelObj = data;
        }
      })
    );
  }

  getDetailsToDeleteCheck() {
    this.subscriptionsList.push(
      this.landingSrv.getDataToDeleteCheck().subscribe((data: any) => {
        if (data) {
            this.dataToDelCheckBoxObj = data;
        }
      })
    );
  }

  deleteOnRadio() {
    let id = this.dataToDelObj[this.itemSelectedFromRadio].EmployeeID;
    this.dataToDelObj.splice(this.itemSelectedFromRadio, 1);
    this.subscriptionsList.push(
      this.landingSrv.deleteRadioData(id).subscribe((data: any) => {
        this.snackBar.open('Employee with id: '+id + ' deleted successfully!!', '', {
          duration: 3000
        });
      })
    );
  
  }

  onAllSelectionChange() {   
    if(this.reactiveForm.get('selectAll').value){
      this.reactiveForm.get('selectAll').setValue(true);
    }else{
      this.reactiveForm.get('selectAll').setValue(false);
    }
    
    this.dataToDelCheckBoxObj.forEach(data => {
      data['checked'] = this.reactiveForm.get('selectAll').value;
      if(this.reactiveForm.get('selectAll').value){
        this.idObj.push(data.EmployeeID);
      }else{
        this.idObj = [];
      }
    });
  }

  onSelectionChange(event, item) {
    item['checked'] = event.currentTarget.checked;
    if(event.currentTarget.checked){
    this.idObj.push(item.EmployeeID);
    }else{
      this.reactiveForm.get('selectAll').setValue(event.currentTarget.checked);
      const objIdRef = this.idObj.find(ele => ele === item.EmployeeID);
      objIdRef && this.idObj.splice(this.idObj.indexOf(objIdRef), 1);
    }
  }

  bulkDelete(){
    this.reactiveForm.get('selectAll').setValue(false);
    for (let id of this.idObj) {
      const objIdRef = this.dataToDelCheckBoxObj.find(ele => ele.EmployeeID === id);
      objIdRef && this.dataToDelCheckBoxObj.splice(this.dataToDelCheckBoxObj.indexOf(objIdRef), 1);
    }
    this.idObj.forEach(data => {
      this.subscriptionsList.push(
        this.landingSrv.deleteCheckData(data).subscribe((data: any) => {
        })
      );
    });
    this.strCSVId = this.idObj.join(',');
    this.snackBar.open('Employee with ids: '+this.strCSVId + ' deleted successfully!!', '', {
      duration: 3000
    });

  }


}
