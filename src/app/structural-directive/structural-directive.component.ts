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
  obj = [
    {
        "EmployeeID": 1,
        "lastname": "Davolio",
        "firstname": "Nancy"
    },
    {
        "EmployeeID": 2,
        "lastname": "Fuller",
        "firstname": "Andrew"
    },
    {
        "EmployeeID": 3,
        "lastname": "Leverling",
        "firstname": "Janet"
    },
    {
        "EmployeeID": 4,
        "lastname": "Peacock",
        "firstname": "Margaret"
    },
    {
        "EmployeeID": 5,
        "lastname": "Buchanan",
        "firstname": "Steven"
    },
    {
        "EmployeeID": 6,
        "lastname": "Suyama",
        "firstname": "Michael"
    },
    {
        "EmployeeID": 7,
        "lastname": "King",
        "firstname": "Robert"
    },
    {
        "EmployeeID": 8,
        "lastname": "Callahan",
        "firstname": "Laura"
    },
    {
        "EmployeeID": 9,
        "lastname": "Dodsworth",
        "firstname": "Anne"
    }
]
  name = 'Kameshwara';
  

  constructor() { }

  ngOnInit(): void {
  }

}
