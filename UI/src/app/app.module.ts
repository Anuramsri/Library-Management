import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import {UserConfigurationComponent} from '../app/configuration/user/user.component';
import {BookConfigurationComponent} from '../app/configuration/book/book.component';
import{LoginComponent} from '../app/login/login.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';


// Testing
import { MatSliderModule } from '@angular/material/slider';
// Material
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    ConfigurationComponent,
    UserConfigurationComponent,
    BookConfigurationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    HttpModule,
    MatSnackBarModule,
    MatSliderModule,
    MatPaginatorModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
