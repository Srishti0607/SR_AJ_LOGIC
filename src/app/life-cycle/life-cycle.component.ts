import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-life-cycle',
  templateUrl: './life-cycle.component.html',
  styleUrls: ['./life-cycle.component.css']
})
export class LifeCycleComponent implements OnInit, OnChanges,
DoCheck,
AfterContentInit,
AfterContentChecked,
AfterViewInit,
AfterViewChecked,
OnDestroy  {
  displayChild: boolean = false;

  constructor() {
    console.log("Life-Cycle Component: Constructor");
   }

   toggle() {
    this.displayChild = !this.displayChild;
  }

  ngOnChanges() {
    console.log("Life-Cycle Component: OnChanges");
  }

  ngOnInit() {
    console.log("Life-Cycle Component: OnInit");
  }

  ngDoCheck() {
    console.log("Life-Cycle Component: DoCheck");
  }

  ngAfterContentInit() {
    console.log("Life-Cycle Component: AfterContentInit");
  }

  ngAfterContentChecked() {
  console.log("Life-Cycle Component:AfterContentChecked");
  }

  ngAfterViewInit() {
  console.log("Life-Cycle Component:AfterViewInit");
  }

  ngAfterViewChecked() {
    console.log("Life-Cycle Component:AfterViewChecked");
  }

  ngOnDestroy() {
    console.log("Life-Cycle Component:OnDestroy");
  }

}
