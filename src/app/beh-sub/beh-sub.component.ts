import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LandingService } from '../services/landing.service';

@Component({
  selector: 'app-beh-sub',
  templateUrl: './beh-sub.component.html',
  styleUrls: ['./beh-sub.component.css']
})
export class BehSubComponent implements OnInit {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  companyObj: any = [];
  reactiveForm!: FormGroup;

  constructor(private landingSrv: LandingService) { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      currencyCode: new FormControl([])
    });
    this.getCountryCodesData();
  }

  getCountryCodesData() {
    this.subscriptionsList.push(
      this.landingSrv.getbehData().subscribe((data: any) => {
        if (data) {
          this.companyObj = data;
        }
      })
    );
  }

  updateInputs(){    
    
  }

}
