import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(private router: Router) { }


    isAuthenticated(): boolean{
        if (localStorage.getItem("token")) {
          return true;
        }
        else{
          return false;
        }
      }


      canActivate(): boolean {
        if (!this.isAuthenticated()) {
          this.router.navigate(['login']);
          return false;
        }
        return true;
      }
 
    
}