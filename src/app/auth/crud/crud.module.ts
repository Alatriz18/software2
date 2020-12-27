import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [CrudComponent],
  imports: [
    BrowserModule,
    NgModule,
    AppRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class CrudModule { }
