import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentLoadDirective } from '../directives/compLoader.directive'
import { InputListComponentComponent } from '../input-list-component/input-list-component.component';

@Component({
  selector: 'app-load-directive',
  templateUrl: './load-directive.component.html',
  styleUrls: ['./load-directive.component.css']
})
export class LoadDirectiveComponent implements OnInit {
  compName: any = InputListComponentComponent ; //Component Name Stored
  @ViewChild(ComponentLoadDirective, { static: true }) //Add directive as view child
  compLoad: ComponentLoadDirective;

  constructor() { }

  ngOnInit(): void {
  }

  loadComponent(): void {
      const viewContainerRef = this.compLoad.viewContainerRef;
      viewContainerRef.clear();
      viewContainerRef.createComponent(this.compName);
  }

}
