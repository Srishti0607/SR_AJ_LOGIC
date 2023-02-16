import { Component, OnInit } from '@angular/core';
import { LandingService } from '../services/landing.service';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit {
  companyObj: any = []

  constructor(private landingSrv: LandingService) { }

  ngOnInit(): void {
    this.landingSrv.captureCompany.subscribe(res => {
      this.companyObj = res;
    });
  }

}
