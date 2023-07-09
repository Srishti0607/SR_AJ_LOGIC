import { Component } from '@angular/core';
import {select, Store} from '@ngrx/store';
import { EmployeeDataState } from '../store/data.reducer';
import { Observable } from 'rxjs';
import { EmployeeData } from '../data.model';
import { selectEmployeeData } from '../store/data.selector';
import { addEmployeeData } from '../store/data.actions';

@Component({
  selector: 'app-store-mgt',
  templateUrl: './store-mgt.component.html',
  styleUrls: ['./store-mgt.component.css']
})
export class StoreMgtComponent {
  empData: Observable<EmployeeData[]>;
  empName: any;
  empAge:any;

  constructor(private store: Store<EmployeeDataState>){
    this.empData = this.store.pipe(select(selectEmployeeData));
  }

  addCustomer() {
        const employeeData = new EmployeeData();
        employeeData.name = this.empName;
        employeeData.age = this.empAge;
        this.store.dispatch(addEmployeeData(employeeData));
        this.empName = '';
        this.empAge = '';
      }

}
