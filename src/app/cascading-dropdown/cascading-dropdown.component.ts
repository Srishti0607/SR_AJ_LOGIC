import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LandingService } from '../services/landing.service';

@Component({
  selector: 'app-cascading-dropdown',
  templateUrl: './cascading-dropdown.component.html',
  styleUrls: ['./cascading-dropdown.component.css']
})
export class CascadingDropdownComponent implements OnInit {
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  countryDetails: any = [];
  countrySelected: any = 'NA';
  stateSelected: any = 'NA' ;
  stateDetails: any = [];
  cityDetails: any = [];
  citySelected: any = 'NA';

  constructor(private landingSrv: LandingService) { }

  ngOnInit(): void {
   this.getDetails();
  }

  getDetails(){
    this.subscriptionsList.push(
      this.landingSrv.getCountryStateCityDetails().subscribe((data: any) => {
        if (data) {
          this.countryDetails = data['Countries'];
        }
      })
    );
  }

  storeStateValue(){
    this.stateSelected = 'NA';
    this.citySelected = 'NA';
   let index = this.countryDetails.findIndex((country: any) => country.CountryName == this.countrySelected);
   this.stateDetails = this.countryDetails[index]['States'];
  }

  storeCityValue(){
    this.citySelected = 'NA';
    let index = this.stateDetails.findIndex((state: any) => state.StateName == this.stateSelected);
    this.cityDetails = this.stateDetails[index]['Cities'];
  }

  submitData(){
    alert("Country name is "+this.countrySelected+" ,State is "+this.stateSelected+" ,City is"+this.citySelected);
  }

}
