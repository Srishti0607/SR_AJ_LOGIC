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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoadDirectiveComponent } from './load-directive/load-directive.component';
import { InputListComponentComponent } from './input-list-component/input-list-component.component';
import {ComponentLoadDirective} from './directives/compLoader.directive'
import {IfDirective} from './directives/structFunc.directive';
import { LoadPipeComponent } from './load-pipe/load-pipe.component'
import { FieldAscSortPipe,CapitalPipe,SearchPipe,ImpureSortPipe,AlphaSortPipe,ConvertPipe } from "./pipes/custom.pipe";
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
import { CrudOprComponent } from './crud-opr/crud-opr.component';
import { NetSalRadioComponent } from './net-sal-radio/net-sal-radio.component';
import { NetSalCheckComponent } from './net-sal-check/net-sal-check.component';
import { ListBoxComponent } from './list-box/list-box.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { CookieHandlerComponent } from './cookie-handler/cookie-handler.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CookieService } from 'ngx-cookie-service';
import { ChartsComponent } from './charts/charts.component';
import { BehSubComponent } from './beh-sub/beh-sub.component';
import { NgChartsModule } from "ng2-charts";
import { ViewBehComponent } from './view-company/view-company.component';
import { TextareaFormComponent } from './textarea-form/textarea-form.component';
import { TemplateTextareaFormComponent } from './template-textarea-form/template-textarea-form.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import {LoadingSpinnerService } from './services/loading-spinner.service';
import { HrssInterceptor } from "./hrssInterceptor";
import {LoadingSpinnerComponent} from './loading-spinner/loading-spinner.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { PromiseObservableComponent } from './promise-observable/promise-observable.component';
import { ParameterRoutingComponent } from './parameter-routing/parameter-routing.component';
import { ViewProductComponent } from './view-product/view-product.component';
import {AppRouteChangeService} from './services/app-route-change.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoutingFeaturesComponent } from './routing-features/routing-features.component';
import {RouterGuardService} from './routerGuards.service';
import { RouterGuardChildService } from './routerGuardsChild.service';
import RouterDeactivateGuardService from './routerDeactivateGuard.service';
import {ProductscatalogComponent} from './productscatalog/productscatalog.component';
import {FilterComponent} from './filter/filter.component';
import { CheckTemplateComponent } from './check-template/check-template.component';
import { ExportFilesComponent } from './export-files/export-files.component';
import { ExportAsModule } from 'ngx-export-as';
import { CustomCalendarComponent } from './custom-calendar/custom-calendar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NewOrderAccordianComponent } from './new-order-accordian/new-order-accordian.component';
export const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HrssInterceptor, multi: true }
];

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
    AlphaSortPipe,
    ConvertPipe,
    ChildComponent,
    LifeCycleComponent,
    SubtotalsRunningtotalsComponent,
    SubtotalsAccordianComponent,
    MultiLevelAccordianComponent,
    BulkDeleteComponent,
    BulkInsertComponent,
    BulkUpdateComponent,
    CrudOprComponent,
    NetSalRadioComponent,
    NetSalCheckComponent,
    ListBoxComponent,
    InfiniteScrollComponent,
    CookieHandlerComponent,
    ChartsComponent,
    BehSubComponent,
    ViewBehComponent,
    TextareaFormComponent,
    TemplateTextareaFormComponent,
    FormBuilderComponent,
    LoadingSpinnerComponent,
    PromiseObservableComponent,
    ParameterRoutingComponent,
    ViewProductComponent,
    NotFoundComponent,
    RoutingFeaturesComponent,
    ProductscatalogComponent,
    FilterComponent,
    CheckTemplateComponent,
    ExportFilesComponent,
    CustomCalendarComponent,
    NewOrderAccordianComponent
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
    ReactiveFormsModule,
    NgbModule,
    InfiniteScrollModule,
    NgChartsModule,
    NgxSpinnerModule,
    ExportAsModule,
    FlexLayoutModule
  ],
  providers: [
    LandingService,
    FieldAscSortPipe,CapitalPipe,SearchPipe,ImpureSortPipe,AlphaSortPipe,ConvertPipe,
    CookieService,
    LoadingSpinnerService,
    interceptorProviders,
    AppRouteChangeService,
    RouterGuardService,
    RouterGuardChildService,
    RouterDeactivateGuardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
