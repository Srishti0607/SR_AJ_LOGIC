import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LandingService } from '../services/landing.service';

@Component({
  selector: 'app-parameter-routing',
  templateUrl: './parameter-routing.component.html',
  styleUrls: ['./parameter-routing.component.css']
})
export class ParameterRoutingComponent implements OnInit {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  behObj: any = [];

  constructor(private landingSrv: LandingService) { 
    this.landingSrv.parameterizedCalled = true;
  }

  ngOnInit(): void {
    this.subscriptionsList.push(
      this.landingSrv.getbehData().subscribe((data: any) => {
        if (data) {
          this.behObj = data;
        }
      })
    );
  }

}
