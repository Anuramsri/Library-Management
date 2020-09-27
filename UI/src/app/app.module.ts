import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import {UserConfigurationComponent} from '../app/configuration/user/user.component';
import {BookConfigurationComponent} from '../app/configuration/book/book.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    ConfigurationComponent,
    UserConfigurationComponent,
    BookConfigurationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
