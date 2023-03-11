import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { LandingService } from '../services/landing.service';

@Component({
  selector: 'app-subtotals-accordian',
  templateUrl: './subtotals-accordian.component.html',
  styleUrls: ['./subtotals-accordian.component.css']
})
export class SubtotalsAccordianComponent implements OnInit {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  orderDetObj: any = []; //Store order details 
  detailsArray: any = [];
  subTotals: any = [];
  grandTotal: any = 0;

  constructor(private landingSrv: LandingService) { }

  ngOnInit(): void {
    this.getSubTotals();
    this.getOrderDetails();
  }

  getSubTotals() {
    this.subscriptionsList.push(
      this.landingSrv.getTotalData().subscribe((data: any) => {
        if (data) {
          this.subTotals = data;
        }
      })
    );

  }

  getOrderDetails() {
    this.subscriptionsList.push(
      this.landingSrv.getOrderData().subscribe((data: any) => {
        if (data) {
          let orderId;
          data.forEach(order => {
            if (orderId == order.ORDERID) {
              this.detailsArray.push(order);
            } else {
              let totalVal = 0;
                this.subTotals.forEach(total => {
                  if (total.orderid == order.ORDERID) {
                    totalVal = totalVal + total.GrandTotal;
                    this.grandTotal = this.grandTotal + totalVal;
                  }
                });
                this.detailsArray = [];
                orderId = order.ORDERID;
                this.detailsArray.push(order);
                let ele = {
                  "isActive": false,
                  "orderId": order.ORDERID,
                  "orderDate": order.ORDERDATE,
                  "companyName": order.COMPANYNAME,
                  "subTotal": totalVal,
                  [order.ORDERID]: this.detailsArray
                }
                this.orderDetObj.push(ele);  
            }
          });
        }
      })
    );
  }

  toggleAccordian(event, index) {
    const element = event.target;
    element.classList.toggle("active");
    if (this.orderDetObj[index].isActive) {
      this.orderDetObj[index].isActive = false;
    } else {
      this.orderDetObj[index].isActive = true;
    }
  }

  toggleAll() {
    this.orderDetObj.forEach(orderDet => {
      if (orderDet['isActive']) {
        orderDet['isActive'] = false;
      } else {
        orderDet['isActive'] = true;
      }
    });

  }
}
