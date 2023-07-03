import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LandingService } from '../services/landing.service';

@Component({
  selector: 'app-route-to',
  templateUrl: './route-to.component.html',
  styleUrls: ['./route-to.component.css']
})
export class RouteToComponent {
  // name: string;
  @Input() name: string;

  constructor(public route: ActivatedRoute,public landingSrv:LandingService){
    // this.route.paramMap.subscribe(params => {
    //   this.name= params.get('name');
    // });
    console.log(this.landingSrv.baseUrl);
    console.log(this.landingSrv['currencyDetBaseURL']);
    console.log(this.landingSrv['#currencyDetBaseURLDefined']);
  }

}
