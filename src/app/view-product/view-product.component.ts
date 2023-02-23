import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LandingService } from '../services/landing.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  categoryObj: any = [];
  category: any;
  isName: any;
  name: string = "-";

  constructor(private landingSrv: LandingService, activeRoute: ActivatedRoute) { 
    this.category = activeRoute.snapshot.params["category"];
    this.isName = activeRoute.snapshot.params["isNameAvailable"];
    if(this.isName){
      this.name = activeRoute.snapshot.params["name"];
    }
  }

  ngOnInit(): void {   
        this.subscriptionsList.push(
          this.landingSrv.getbehCategoryData(this.category).subscribe((data: any) => {
            if (data) {
              this.categoryObj = [];
              this.categoryObj = data;
            }
          })
        );
  }

}
