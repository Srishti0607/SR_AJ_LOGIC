import { Component, OnInit } from '@angular/core';
import { LandingService } from '../services/landing.service';
import { Subscription } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';

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
  selectAll: any;
  idObj: any = [];
  strCSVId: string = '';

  constructor(private landingSrv: LandingService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
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
    this.snackBar.open('Employee with id: '+id + ' deleted successfully!!', '', {
      duration: 3000
    });
  }

  onAllSelectionChange(event: any) {
    this.selectAll = event;
    this.dataToDelCheckBoxObj.forEach(data => {
      data['checked'] = this.selectAll;
      if(this.selectAll){
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
      this.selectAll= event.currentTarget.checked;
      const objIdRef = this.idObj.find(ele => ele === item.EmployeeID);
      objIdRef && this.idObj.splice(this.idObj.indexOf(objIdRef), 1);
    }
  }

  bulkDelete(){
    this.selectAll = false;
    for (let id of this.idObj) {
      const objIdRef = this.dataToDelCheckBoxObj.find(ele => ele.EmployeeID === id);
      objIdRef && this.dataToDelCheckBoxObj.splice(this.dataToDelCheckBoxObj.indexOf(objIdRef), 1);
    }
    this.strCSVId = this.idObj.join(',');
    this.snackBar.open('Employee with ids: '+this.strCSVId + ' deleted successfully!!', '', {
      duration: 3000
    });

  }


}
