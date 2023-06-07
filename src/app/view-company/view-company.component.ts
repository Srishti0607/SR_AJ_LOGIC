import { Component, OnInit, effect, signal } from '@angular/core';
import { Subscription } from 'rxjs';
import { LandingService } from '../services/landing.service';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewBehComponent implements OnInit {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  categoryObj: any = [];
  signalCategoryObj: any = [];
  productVal = effect(() => {
    this.getProducts(this.landingSrv.captureSignal());
  });

  constructor(private landingSrv: LandingService) { 
  }

  ngOnInit(): void {
    this.landingSrv.captureBeh.subscribe(res => {
      if(res != null){
        this.subscriptionsList.push(
          this.landingSrv.getbehCategoryData(res).subscribe((data: any) => {
            if (data) {
              this.categoryObj = [];
              this.categoryObj = data;
            }
          })
        );
      }
    });
  }

  getProducts(productValue){
    this.subscriptionsList.push(
      this.landingSrv.getbehCategoryData(productValue).subscribe((data: any) => {
        if (data) {
          this.signalCategoryObj = data;
        }
      })
    );
}

}
