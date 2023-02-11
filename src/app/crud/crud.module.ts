import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulkDeleteComponent } from './components/bulk-delete/bulk-delete.component';
import { BulkInsertComponent } from './components/bulk-insert/bulk-insert.component';
import { BulkUpdateComponent } from './components/bulk-update/bulk-update.component';
import { CrudOprComponent } from './components/crud-opr/crud-opr.component';
import { CrudRoutingModule } from './crud.-routing.module';
import { CrudService } from './crud.service';
import { CrudComponent } from './crud/crud.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    BulkDeleteComponent,
    BulkInsertComponent,
    BulkUpdateComponent,
    CrudOprComponent,
    CrudComponent,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,ReactiveFormsModule,
    NgbModule,
    MatFormFieldModule,
    CrudRoutingModule
  ],
  providers: [CrudService]
})
export class CrudModule { }
