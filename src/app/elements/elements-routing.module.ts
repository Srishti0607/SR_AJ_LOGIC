

import { NgModule } from '@angular/core';
import { SubtotalsAccordianComponent } from './components/subtotals-accordian/subtotals-accordian.component';
import { MultiLevelAccordianComponent } from './components/multi-level-accordian/multi-level-accordian.component';
import { NetSalRadioComponent } from './components/net-sal-radio/net-sal-radio.component';
import { NetSalCheckComponent } from './components/net-sal-check/net-sal-check.component';
import { ListBoxComponent } from './components/list-box/list-box.component';
import { LifeCycleComponent } from './components/life-cycle/life-cycle.component';
import { SubtotalsRunningtotalsComponent } from './components/subtotals-runningtotals/subtotals-runningtotals.component';
import { LoadPipeComponent } from './components/load-pipe/load-pipe.component'
import { LoadDirectiveComponent } from './components/load-directive/load-directive.component';
import { Routes, RouterModule } from '@angular/router';
import {ElementComponent} from './element/element.component';


const routes: Routes = [
    {
        path: '', component: ElementComponent,
        children: [
            { path: 'custom-directive', component: LoadDirectiveComponent },
            { path: 'custom-pipe', component: LoadPipeComponent },
            { path: 'life-cycle', component: LifeCycleComponent },
            { path: 'orders', component: SubtotalsRunningtotalsComponent },
            { path: 'orders-accordian', component: SubtotalsAccordianComponent },
            { path: 'multi-level', component: MultiLevelAccordianComponent },
            { path: 'net-sal-radio', component: NetSalRadioComponent },
            { path: 'net-sal-check', component: NetSalCheckComponent },
            { path: 'list-box', component: ListBoxComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ElementRoutingModule { }