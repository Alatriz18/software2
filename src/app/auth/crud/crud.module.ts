import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudRoutingModule } from './crud-routing.module';
import { CrudComponent } from './crud.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [CrudComponent],
  imports: [
    CommonModule,
    CrudRoutingModule,
    NgxPaginationModule
  ]
})
export class CrudModule { }
