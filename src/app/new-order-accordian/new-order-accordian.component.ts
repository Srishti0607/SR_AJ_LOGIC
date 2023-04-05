import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LandingService } from '../services/landing.service';

@Component({
  selector: 'app-new-order-accordian',
  templateUrl: './new-order-accordian.component.html',
  styleUrls: ['./new-order-accordian.component.css']
})
export class NewOrderAccordianComponent implements OnInit {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  orderDetObj: any = []; //Store order details 
  grandTotal: any = 0;

  constructor(private landingSrv: LandingService) { }

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails() {
    this.subscriptionsList.push(
      this.landingSrv.getNewOrderData().subscribe((data: any) => {
        if (data) {
          this.orderDetObj = data[0]['order'];
          this.grandTotal = data[0]['GrandTotal'];
        }
      })
    );
  }

  appendTd(event, index) {
    let target = event.currentTarget,
      classList = target.classList;
    if (this.orderDetObj[index].isActive) {
      this.orderDetObj[index].isActive = false;
      classList.remove('fa-minus');
      classList.add('fa-plus');
    } else {
      this.orderDetObj[index].isActive = true;
      classList.remove('fa-plus');
      classList.add('fa-minus');
    }
  }

  toggleAll(opr) {
    if (opr == 1) {
      this.orderDetObj.forEach(orderDet => {
        orderDet['isActive'] = true;
        let target: HTMLElement;
        let classList: any
        target = document.getElementById('Id-' + orderDet['ORDERID'])
        classList = target.classList;
        classList.add('fa-minus');
        classList.remove('fa-plus');
      });
    } else {
      this.orderDetObj.forEach(orderDet => {
        orderDet['isActive'] = false;
        let target: HTMLElement;
        let classList: any
        target = document.getElementById('Id-' + orderDet['ORDERID'])
        classList = target.classList;
        classList.remove('fa-minus');
        classList.add('fa-plus');
      });

    }
  }

}
