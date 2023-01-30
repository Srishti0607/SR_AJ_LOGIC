import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
//Component
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
//Modules /Material
import { AppRoutingModule } from './app-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {LandingService} from './services/landing.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoadDirectiveComponent } from './load-directive/load-directive.component';
import { InputListComponentComponent } from './input-list-component/input-list-component.component';
import {ComponentLoadDirective} from './directives/compLoader.directive'
import {IfDirective} from './directives/structFunc.directive';
import { LoadPipeComponent } from './load-pipe/load-pipe.component'
import { FieldAscSortPipe,CapitalPipe,SearchPipe,ImpureSortPipe } from "./pipes/custom.pipe";
import { NgxPaginationModule } from 'ngx-pagination';
import { ChildComponent } from './child/child.component';
import {LifeCycleComponent} from './life-cycle/life-cycle.component';
import { SubtotalsRunningtotalsComponent } from './subtotals-runningtotals/subtotals-runningtotals.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SubtotalsAccordianComponent } from './subtotals-accordian/subtotals-accordian.component';
import { MultiLevelAccordianComponent } from './multi-level-accordian/multi-level-accordian.component';
import { BulkDeleteComponent } from './bulk-delete/bulk-delete.component';
import { BulkInsertComponent } from './bulk-insert/bulk-insert.component';
import { BulkUpdateComponent } from './bulk-update/bulk-update.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoadDirectiveComponent,
    InputListComponentComponent,
    ComponentLoadDirective,
    IfDirective,
    LoadPipeComponent,
    FieldAscSortPipe,
    CapitalPipe,
    SearchPipe,
    ImpureSortPipe,
    ChildComponent,
    LifeCycleComponent,
    SubtotalsRunningtotalsComponent,
    SubtotalsAccordianComponent,
    MultiLevelAccordianComponent,
    BulkDeleteComponent,
    BulkInsertComponent,
    BulkUpdateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ],
  providers: [
    LandingService,
    FieldAscSortPipe,CapitalPipe,SearchPipe,ImpureSortPipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
