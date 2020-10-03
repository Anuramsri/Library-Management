import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
import { Http, Response, Headers, URLSearchParams, RequestOptions, RequestMethod } from '@angular/http';
import { environment } from "../../environments/environment";
import { switchAll } from 'rxjs/operators';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginComponent]
})
export class LoginComponent implements OnInit {

  localApiUrl = environment.localApiUrl;
  constructor(
    private router: Router,
    private http: Http,
    private _snackBar: MatSnackBar
  ) { }

   ngOnInit() {
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  login(form){
    console.log(form.value)
    this.http.post(this.localApiUrl + "login", form.value)
    .map((res: Response) => res.json())
    .subscribe((res)=>{
      if(res['result']){
        localStorage.setItem('name',res['result']['name'])
        localStorage.setItem('role',res['result']['role'])
      }else{
        this.errorLogin() 
      }
    })

    this.router.navigate(['login']);
  }

errorLogin(){
  this._snackBar.open('Invalid User Credentials!!', 'End now', {
    duration: 500,
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  });
}

}
