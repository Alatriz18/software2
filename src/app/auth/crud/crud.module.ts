import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrudRoutingModule } from './crud-routing.module';
import { CrudComponent } from './crud.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularFireModule} from '@angular/fire';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [CrudComponent],
  imports: [
    CommonModule,
    CrudRoutingModule,
    NgxPaginationModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ]
})
export class CrudModule { }
