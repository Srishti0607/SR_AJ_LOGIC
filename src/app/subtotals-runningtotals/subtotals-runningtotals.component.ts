import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { LandingService } from '../services/landing.service';

@Component({
  selector: 'app-subtotals-runningtotals',
  templateUrl: './subtotals-runningtotals.component.html',
  styleUrls: ['./subtotals-runningtotals.component.css']
})
export class SubtotalsRunningtotalsComponent implements OnInit {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  orderDetObj: any = []; //Store order details 
  orderCustomizedObj: any = []; //Reorder object details
  grandTotal = 0 ; //Store grand total

  constructor(private landingSrv: LandingService) { }

  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(){
    this.subscriptionsList.push(
      this.landingSrv.getOrderData().subscribe((data: any) => {
        if (data) {
          // this.orderDetObj = data;   
          let runningAmt = 0; 
          let orderId = 0; 
          data.forEach(order => {     
            if(orderId == 0){
              orderId = order.ORDERID;
              runningAmt = runningAmt + order.BILLAMOUNT;
              this.pushData(order,runningAmt);            
            }else{
              if(orderId == order.ORDERID){
                runningAmt = runningAmt + order.BILLAMOUNT;
                this.pushData(order,runningAmt);                                          
              }else{
                this.pushData('',runningAmt)
                orderId = order.ORDERID;
                runningAmt = runningAmt + order.BILLAMOUNT;
                this.pushData(order,runningAmt);    
              }
            }
          });
          this.pushData('',runningAmt);
          
          
        }
      })
    );

  }

  pushData(order,runningAmt){  
    if(order == ''){
      let dataToPush =   {
        "ORDERID":'',
        "ORDERDATE":'',
        "COMPANYNAME":'',
        "PRODUCTNAME":'',
        "UNITPRICE":'',
        "QUANTITY":'',
        "BILLAMOUNT":runningAmt,
        "RUNNINGAMT": '',
        "RUNNINGTOTAL": ''
      }
      this.orderDetObj.push(dataToPush);
    }else{
    let dataToPush =   {
      "ORDERID":order.ORDERID,
      "ORDERDATE":order.ORDERDATE,
      "COMPANYNAME":order.COMPANYNAME,
      "PRODUCTNAME":order.PRODUCTNAME,
      "UNITPRICE":order.UNITPRICE,
      "QUANTITY":order.QUANTITY,
      "BILLAMOUNT":order.BILLAMOUNT,
      "RUNNINGAMT": runningAmt,
      "RUNNINGTOTAL": runningAmt
    }
    this.orderDetObj.push(dataToPush);
  }
  this.grandTotal = this.grandTotal + runningAmt;
}
}
