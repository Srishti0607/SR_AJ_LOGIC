import { Component, OnInit } from '@angular/core';
import { LandingService } from '../../landing.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-multi-level-accordian',
  templateUrl: './multi-level-accordian.component.html',
  styleUrls: ['./multi-level-accordian.component.css']
})
export class MultiLevelAccordianComponent implements OnInit {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  employeeDetails: any = [];

  constructor(private landingSrv: LandingService) { }

  ngOnInit(): void {
    this.getEmployeesDetails();
  }

  getEmployeesDetails(){
    this.subscriptionsList.push(
      this.landingSrv.getEmployeeData().subscribe((data: any) => {
        if (data) {         
          this.employeeDetails = data;
        }
      })
    );

  }

  appendTd(event,index,subIndex,opr){
    let target = event.currentTarget,
    classList = target.classList;
    if(opr == 'E'){
    if (this.employeeDetails[index].isActive) {
      this.employeeDetails[index]['order'].forEach(order => { 
        if(order['isActive'] != undefined){
          delete order['isActive']; 
        } 
      });
      this.employeeDetails[index].isActive = false;
      classList.remove('fa-minus');
        classList.add('fa-plus');
    } else {
      this.employeeDetails[index].isActive = true;
      classList.remove('fa-plus');
      classList.add('fa-minus');
    }
  }else{
    if (this.employeeDetails[index]['order'][subIndex].isActive) {
      this.employeeDetails[index]['order'][subIndex].isActive = false;     
        classList.remove('fa-minus');
        classList.add('fa-plus');
    } else {
      this.employeeDetails[index]['order'][subIndex].isActive = true;
      classList.remove('fa-plus');
      classList.add('fa-minus');
    }

  }
  }

}
