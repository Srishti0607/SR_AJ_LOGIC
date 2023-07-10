import { Component } from '@angular/core';
import { LandingService } from '../services/landing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-template-syntax',
  templateUrl: './new-template-syntax.component.html',
  styleUrls: ['./new-template-syntax.component.css']
})
export class NewTemplateSyntaxComponent {
  countryDetObj: any =[];
  public subscriptionsList: Subscription[] = [];

  constructor(private landingSrv: LandingService){}

  ngOnInit(){
    this.subscriptionsList.push(
      this.landingSrv.getCountryDetails().subscribe((data: any) => {
        if (data) {
          this.countryDetObj = data['countries']['country'];
        }
      })
    );

  }

}
