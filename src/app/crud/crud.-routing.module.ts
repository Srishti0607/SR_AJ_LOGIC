import { NgModule } from '@angular/core';
import { BulkDeleteComponent } from './components/bulk-delete/bulk-delete.component';
import { BulkInsertComponent } from './components/bulk-insert/bulk-insert.component';
import { BulkUpdateComponent } from './components/bulk-update/bulk-update.component';
import { CrudOprComponent } from './components/crud-opr/crud-opr.component';
import { Routes, RouterModule } from '@angular/router';
import { CrudComponent } from './crud/crud.component';


const routes: Routes = [
  {
    path: '', component: CrudComponent,
    children: [   
     { path: 'bulk-delete', component: BulkDeleteComponent},
     { path: 'bulk-insert', component: BulkInsertComponent},
     { path: 'bulk-update',component:BulkUpdateComponent},
     { path: 'crud-opr', component:CrudOprComponent}
    ]
  }
  ];

  @NgModule({
    // imports: [RouterModule.forRoot(routes)],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class CrudRoutingModule {}