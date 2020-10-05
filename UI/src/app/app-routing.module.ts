import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../app/Authguard/authguard.service';
import { ConfigurationComponent } from '../app/configuration/configuration.component';
import { BookConfigurationComponent } from '../app/configuration/book/book.component';
import { LoginComponent } from '../app/login/login.component';
import {DashboardComponent} from './Dashboard/dashboard.component';
import { LinkedbooksComponent } from './linkedbooks/linkedbooks.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [AuthGuard],
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'linkedBooks',
    component:LinkedbooksComponent,
    // canActivate:[AuthGuard]
  },

  {
    path: 'configuration',
    component: ConfigurationComponent,
    // canActivate: [AuthGuard],

    children: [
      { path: 'books', component: BookConfigurationComponent },
      { path: 'user', component: BookConfigurationComponent },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
