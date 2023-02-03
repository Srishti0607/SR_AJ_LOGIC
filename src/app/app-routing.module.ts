import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoadDirectiveComponent } from './load-directive/load-directive.component';
import { LoadPipeComponent } from './load-pipe/load-pipe.component';
import {LifeCycleComponent} from './life-cycle/life-cycle.component';
import { SubtotalsRunningtotalsComponent } from './subtotals-runningtotals/subtotals-runningtotals.component';
import { SubtotalsAccordianComponent } from './subtotals-accordian/subtotals-accordian.component';
import { MultiLevelAccordianComponent } from './multi-level-accordian/multi-level-accordian.component';
import { BulkDeleteComponent } from './bulk-delete/bulk-delete.component';
import { BulkInsertComponent } from './bulk-insert/bulk-insert.component';
import { BulkUpdateComponent } from './bulk-update/bulk-update.component';
import { CrudOprComponent } from './crud-opr/crud-opr.component';
import { NetSalRadioComponent } from './net-sal-radio/net-sal-radio.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full'
  },
   { path: 'landing', component: LandingPageComponent },
   { path: 'custom-directive', component: LoadDirectiveComponent },
   { path: 'custom-pipe', component: LoadPipeComponent },
   { path: 'life-cycle', component: LifeCycleComponent },
   { path: 'orders', component: SubtotalsRunningtotalsComponent },
   { path: 'orders-accordian', component: SubtotalsAccordianComponent },
   { path: 'multi-level', component: MultiLevelAccordianComponent},
   { path: 'bulk-delete', component: BulkDeleteComponent},
   { path: 'bulk-insert', component: BulkInsertComponent},
   { path:'bulk-update',component:BulkUpdateComponent},
   { path:'crud-opr', component:CrudOprComponent},
   { path: 'net-sal-radio', component:NetSalRadioComponent}
];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
