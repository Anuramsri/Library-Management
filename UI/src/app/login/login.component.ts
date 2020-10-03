import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from "@angular/router";
import { Http, Response, Headers, URLSearchParams, RequestOptions, RequestMethod } from '@angular/http';
import { environment } from "../../environments/environment";
import { switchAll } from 'rxjs/operators';
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
    private http: Http
  ) { }

   ngOnInit() {
  }

  login(form){
    console.log(form.value)
    this.http.post(this.localApiUrl + "login", form.value)
    .map((res: Response) => res.json())
    .subscribe((res)=>{
      if(res['result']){
        localStorage.setItem('name',res['result']['name'])
        localStorage.setItem('role',res['result']['role'])
      }else{
        
      }
    })

    this.router.navigate(['login']);
  }
}
