import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CapitalPipe } from '../pipes/custom.pipe';
import { Subscription } from "rxjs";
import { LandingService } from '../services/landing.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-load-pipe',
  templateUrl: './load-pipe.component.html',
  styleUrls: ['./load-pipe.component.css']
})
export class LoadPipeComponent implements OnInit, AfterViewInit {
  reactiveForm!: FormGroup;
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  randomNumb: any = []; //Store Random number
  userName: string = 'kameswara'
  public search: any = '';
  locked: any[] = [];
  filterMetadata = { count: 0, value: [] };
  filtre: string;
  sortDir = 1;
  startIndex = 0;
  endIndex = 5;
  config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.locked.length
  };
  columnVal: string = '';
  sortUser: string = 'asc';
  sortAuth: string = 'asc';
  sortMobile: string = 'asc';
  colClicked:string = 'User';
  constructor(private capitalize: CapitalPipe, private landingSrv: LandingService) { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      newDigit: new FormControl(''),
      query: new FormControl(''),
      pageSize: new FormControl('5'),
      num: new FormControl('')
    });
    this.userName = this.capitalize.transform(this.userName);
    this.getRandomNumbers();
    this.subscriptionsList.push(
      this.landingSrv.getUsers().subscribe((data: any) => {
        if (data) {
          this.locked = data;
          this.sortArr('User', '');
        }
      })
    );
  }

  updateConfig() {
    this.config.itemsPerPage = this.reactiveForm.get('pageSize').value;
  }

  onPageChange(e) {
    this.config.currentPage = e;
  }

  trackElement(index: number, element: any) {
    return element ? element.id : null;
  }

  ngAfterViewInit() {
    console.log(this.locked.length);
  }

  getRandomNumbers() {
    for (var num = 0; num < 10; num++) {
      this.randomNumb.push(Math.random())
    }
  }

  addNewDigit() {
    this.randomNumb.push(this.reactiveForm.get('newDigit').value);
  }

  onSortClick(event: any, column: string) {
    this.columnVal = column;

    let target = event.currentTarget,
      classList = target.classList;

    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
      this.sortDir = -1;
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
      this.sortDir = 1;
    }
    // this.sortArr(column,'paginated');

  }

  updateSortVal(event: any, column: string) {
    let target = event.currentTarget,
      classList = target.classList;

    if (column == 'User') {
      if (classList.contains('fa-chevron-up')) {
        classList.remove('fa-chevron-up');
        classList.add('fa-chevron-down');
        this.sortUser = 'desc';
      } else {
        classList.add('fa-chevron-up');
        classList.remove('fa-chevron-down');
        this.sortUser = 'asc';
      }
      this.colClicked = 'User';
    } else if(column == 'AuthID'){
      if (classList.contains('fa-chevron-up')) {
        classList.remove('fa-chevron-up');
        classList.add('fa-chevron-down');
        this.sortAuth = 'desc';
      } else {
        classList.add('fa-chevron-up');
        classList.remove('fa-chevron-down');
        this.sortAuth = 'asc';
      }
      this.colClicked = 'Auth';
    }else {
      if (classList.contains('fa-chevron-up')) {
        classList.remove('fa-chevron-up');
        classList.add('fa-chevron-down');
        this.sortMobile = 'desc';
      } else {
        classList.add('fa-chevron-up');
        classList.remove('fa-chevron-down');
        this.sortMobile = 'asc';
      }
      this.colClicked = 'Mobile';
    }

  }

  sortArr(colName: any, opr) {
    (this.locked).sort((a, b) => {
      a = a[colName].toLowerCase();
      b = b[colName].toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
    // }

  }

  getIndex(pageIndex) {
    this.startIndex = pageIndex * 5;
    this.endIndex = this.startIndex + 5;
  }
  prevIndex(length) {
    this.startIndex = length * 0;
  }
  nextIndex(endIndex) {
    this.endIndex++
  }

  getArrayLenght(length) {
    return new Array(length / 5)
  }

}
