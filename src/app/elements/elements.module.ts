import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubtotalsAccordianComponent } from './components/subtotals-accordian/subtotals-accordian.component';
import { MultiLevelAccordianComponent } from './components/multi-level-accordian/multi-level-accordian.component';
import { NetSalRadioComponent } from './components/net-sal-radio/net-sal-radio.component';
import { NetSalCheckComponent } from './components/net-sal-check/net-sal-check.component';
import { ListBoxComponent } from './components/list-box/list-box.component';
import { ChildComponent } from './components/child/child.component';
import {LifeCycleComponent} from './components/life-cycle/life-cycle.component';
import { SubtotalsRunningtotalsComponent } from './components/subtotals-runningtotals/subtotals-runningtotals.component';
import { LoadPipeComponent } from './components/load-pipe/load-pipe.component'
import { InputListComponentComponent } from './components/input-list-component/input-list-component.component';
import { LoadDirectiveComponent } from './components/load-directive/load-directive.component';
import { LandingService } from './landing.service';
import {ComponentLoadDirective} from '../directives/compLoader.directive'
import {IfDirective} from '../directives/structFunc.directive';
import { FieldAscSortPipe,CapitalPipe,SearchPipe,ImpureSortPipe,AlphaSortPipe } from "../pipes/custom.pipe";
import { NgxPaginationModule } from 'ngx-pagination';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ElementComponent } from './element/element.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ElementRoutingModule} from './elements-routing.module';


@NgModule({
  declarations: [
    LoadDirectiveComponent,
    InputListComponentComponent,
    ChildComponent,
    LifeCycleComponent,
    SubtotalsRunningtotalsComponent,
    SubtotalsAccordianComponent,
    MultiLevelAccordianComponent,
    NetSalRadioComponent,
    NetSalCheckComponent,
    ListBoxComponent,
    LoadPipeComponent,
    ComponentLoadDirective,
    IfDirective,
    FieldAscSortPipe,
    CapitalPipe,
    SearchPipe,
    ImpureSortPipe,
    AlphaSortPipe,
    ElementComponent,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    MatFormFieldModule,
    FormsModule,ReactiveFormsModule,
    NgbModule,
    ElementRoutingModule
  ],
  providers: [
    LandingService,
    FieldAscSortPipe,CapitalPipe,SearchPipe,ImpureSortPipe,AlphaSortPipe
  ]
})
export class ElementsModule { }
