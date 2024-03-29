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
  const: boolean = false;
  onChange: boolean = false;
  init: boolean = false;
  doCheck: boolean = false;
  afterContentInit: boolean = false;
  afterContentChecked: boolean = false;
  afterViewInit: boolean = false;
  afterViewChecked: boolean = false;
  destroy: boolean = false;

  constructor() {
    console.log("Life-Cycle Component: Constructor");
    this.const = true;
   }

   toggle() {
    this.displayChild = !this.displayChild;
  }

  ngOnChanges() {
    console.log("Life-Cycle Component: OnChanges");
    this.onChange = true;
  }

  ngOnInit() {
    console.log("Life-Cycle Component: OnInit");
    this.init = true;
  }

  ngDoCheck() {
    console.log("Life-Cycle Component: DoCheck");
    this.doCheck = true;
  }

  ngAfterContentInit() {
    console.log("Life-Cycle Component: AfterContentInit");
    this.afterContentInit = true;
  }

  ngAfterContentChecked() {
  console.log("Life-Cycle Component:AfterContentChecked");
  this.afterContentChecked = true;
  }

  ngAfterViewInit() {
  console.log("Life-Cycle Component:AfterViewInit");
  this.afterViewInit = true;
  }

  ngAfterViewChecked() {
    console.log("Life-Cycle Component:AfterViewChecked");
    this.afterViewChecked = true;
  }

  ngOnDestroy() {
    console.log("Life-Cycle Component:OnDestroy");
    this.destroy = true;
  }

}
