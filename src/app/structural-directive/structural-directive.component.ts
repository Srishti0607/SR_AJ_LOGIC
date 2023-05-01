import { Component, OnInit } from '@angular/core';
import { LandingService } from '../services/landing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-structural-directive',
  templateUrl: './structural-directive.component.html',
  styleUrls: ['./structural-directive.component.css']
})
export class StructuralDirectiveComponent implements OnInit {
  condition: boolean = true;
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  obj = {
    a: 'one',
    b: 'two',
    c: 'three'
  }
  name = 'Kameshwara';
  

  constructor() { }

  ngOnInit(): void {
  }

}
