import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LandingService } from '../services/landing.service';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.css']
})
export class InfiniteScrollComponent implements OnInit {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  countryDet: any = [];
  page: number = 1;
  limit:number = 20;

  constructor(private landingSrv: LandingService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.subscriptionsList.push(
      this.landingSrv.getCountryData(this.page,this.limit).subscribe((data: any) => {
        if (data) {
          this.countryDet = [...this.countryDet,...data];          
        }
      })
    );
  }

  onScroll(e) {
    console.log(this.page++);
    this.page = this.page++;
    this.getData();
  }

}
