import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LandingService } from '../services/landing.service';

@Component({
  selector: 'app-routing-features',
  templateUrl: './routing-features.component.html',
  styleUrls: ['./routing-features.component.css']
})
export class RoutingFeaturesComponent implements OnInit {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  countryDetObj: any = []; //store country details getting from service
  data: any;

  constructor(private landingSrv: LandingService, public router:Router) { }

  ngOnInit(): void {
    this.subscriptionsList.push(
      this.landingSrv.getCountryDetails().subscribe((data: any) => {
        if (data) {
          this.countryDetObj = data['countries']['country'];
        }
      })
    );
  }

  updateInputs(){
    if(this.data){
    this.router.navigate(['/routing-features/life-cycle/'+JSON.stringify(this.data)])
    }
  }

}
