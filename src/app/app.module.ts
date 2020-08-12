import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire'
import {AngularFirestoreModule} from '@angular/fire/firestore'
import { environment } from 'src/environments/environment';
import { UsersComponent } from './users/users.component';
import { UserslistComponent } from './users/userslist/userslist.component';
import { UserComponent } from './users/user/user.component';
import {UsersService} from './shared/users.service'

import {FormsModule} from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';
import { TowingComponent } from './towing/towing.component';
import { ReportsComponent } from './reports/reports.component';

import { ServicesComponent } from './services/services.component';
import { RouterModule } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { VehichleComponent } from './cars/vehichle/vehichle.component';
import { VehichleListComponent } from './cars/vehichle-list/vehichle-list.component';
import { ServiceListComponent } from './services/service-list/service-list.component';
import { TowingListComponent } from './towing/towing-list/towing-list.component';
import { CustomDialogComponent } from './custom-dialog/custom-dialog.component';

@NgModule({
  entryComponents:[
    CustomDialogComponent
  ],
  declarations: [
    AppComponent,
    UsersComponent,
    UserslistComponent,
    UserComponent,
    TowingComponent,
    ReportsComponent,
   
    ServicesComponent,
   
    CarsComponent,
   
    VehichleComponent,
   
    VehichleListComponent,
   
    ServiceListComponent,
   
    TowingListComponent,
   
    CustomDialogComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    MatButtonModule,
    AppRoutingModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), 
    RouterModule.forRoot([
      {path:'',component:UsersComponent},
      {path:'towing',component:TowingComponent},
      {path:'services',component:ServicesComponent},
      {path:'reports',component:ReportsComponent},
      {path:'cars',component:CarsComponent},

    ]

    )
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
