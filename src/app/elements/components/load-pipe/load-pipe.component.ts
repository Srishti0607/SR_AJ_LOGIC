import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CapitalPipe } from '../../../pipes/custom.pipe';
import { Subscription } from "rxjs";
import { LandingService } from '../../landing.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-load-pipe',
  templateUrl: './load-pipe.component.html',
  styleUrls: ['./load-pipe.component.css']
})
export class LoadPipeComponent implements OnInit,AfterViewInit {
  reactiveForm!: FormGroup;
  public subscriptionsList: Subscription[] = []; // to unsubscribe API calls
  randomNumb: any = []; //Store Random number
  userName: string = 'kameswara'
  public search:any = '';
  locked: any[] = [];
  filterMetadata = { count: 0 };
  filtre: string;
  sortDir = 1;
  startIndex = 0;
  endIndex = 5;
  config = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.locked.length
  };
  constructor(private capitalize:CapitalPipe, private landingSrv: LandingService) { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      newDigit: new FormControl(''),
      query: new FormControl(''),
      pageSize: new FormControl('')
    });
    this.userName = this.capitalize.transform(this.userName);
    this.getRandomNumbers();
    this.subscriptionsList.push(
      this.landingSrv.getUsers().subscribe((data: any) => {
        if (data) {
          this.locked = data;
        }
      })
    );
  this.sortArr('User');
  }

  updateConfig(){
    this.reactiveForm.get('pageSize').setValue(this.config.itemsPerPage);
  }

  onPageChange(e){
    this.config.currentPage = e;
  }

  trackElement(index: number, element: any) {
    return element ? element.id : null;
  }

  ngAfterViewInit() {
    console.log(this.locked.length);
  }

  getRandomNumbers(){
    for(var num = 0;num <10 ; num++){
      this.randomNumb.push(Math.random())
    }
  }

  addNewDigit(){
    this.randomNumb.push(this.reactiveForm.get('newDigit').value);
  }

  onSortClick(event:any,column: any){
    let target = event.currentTarget,
      classList = target.classList;

    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
      this.sortDir=-1;
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
      this.sortDir=1;
    }
    this.sortArr(column);

  }

  sortArr(colName:any){
    this.locked.sort((a,b)=>{
      a= a[colName].toLowerCase();
      b= b[colName].toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }

  getIndex(pageIndex){
    this.startIndex = pageIndex * 5;
   this.endIndex = this.startIndex + 5;
   console.log(this.startIndex);
  }
  prevIndex(length){
    this.startIndex = length * 0;
    console.log(this.startIndex)
  }
  nextIndex(endIndex){
    this.endIndex++
    console.log(this.endIndex)
  }

    getArrayLenght(length){
    return new Array(length/5)
  }

}
