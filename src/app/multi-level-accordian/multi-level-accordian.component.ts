import { Component, OnInit } from '@angular/core';
import { LandingService } from '../services/landing.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-multi-level-accordian',
  templateUrl: './multi-level-accordian.component.html',
  styleUrls: ['./multi-level-accordian.component.css']
})
export class MultiLevelAccordianComponent implements OnInit {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  employeeDetails: any = [];
  orderFlag:boolean = false;
  orderDetFlag:boolean = false;

  constructor(private landingSrv: LandingService) { }

  ngOnInit(): void {
    this.getEmployeesDetails();
  }

  getEmployeesDetails() {
    this.subscriptionsList.push(
      this.landingSrv.getEmployeeData().subscribe((data: any) => {
        if (data) {
          this.employeeDetails = data;
        }
      })
    );

  }

  appendTd(event, index, subIndex, opr) {
    let target = event.currentTarget,
      classList = target.classList;
    if (opr == 'E') {
      if (this.employeeDetails[index].isActive) {
        this.employeeDetails[index]['order'].forEach(order => {
          if (order['isActive'] != undefined) {
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
    } else {
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

  toggleAll(opr) {
    if (opr == 1) {
      this.employeeDetails.forEach(data => {
        if (data['order'].length != 0) {
          let target: HTMLElement;
          let classList: any
          target = document.getElementById('Id-' + data['EmployeeID'])
          classList = target.classList;
          data['isActive'] = true;
          classList.add('fa-minus');
          classList.remove('fa-plus');
        }
      })
    } else if (opr == 3) {
      this.employeeDetails.forEach(data => {
        if (data['order'].length != 0) {
          let target: HTMLElement;
          let classList: any
          target = document.getElementById('Id-' + data['EmployeeID'])
          classList = target.classList;
          data['isActive'] = false;
          classList.remove('fa-minus');
          classList.add('fa-plus');
        }
      })
    } else if (opr == 2) {
      this.employeeDetails.forEach(data => {
        if (data['order'].length != 0) {
          data['order'].forEach(orderDet => {
            if(orderDet['orderDetails'].length != 0){
            orderDet['isActive'] = true;
            let target: HTMLElement;
            let classList: any
            target = document.getElementById('Id-' + orderDet['orderid'])
            classList = target.classList;
            classList.add('fa-minus');
            classList.remove('fa-plus');
            }
          });
        }
      })
    } else{
      this.employeeDetails.forEach(data => {
        if (data['order'].length != 0) {
          data['order'].forEach(orderDet => {
            if(orderDet['orderDetails'].length != 0){
            orderDet['isActive'] = false;
            let target: HTMLElement;
            let classList: any
            target = document.getElementById('Id-' + orderDet['orderid'])
            classList = target.classList;
            classList.remove('fa-minus');
            classList.add('fa-plus');
            }
          });
        }
      })

    }

  }

}
