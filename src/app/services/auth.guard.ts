import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,): boolean  {
    if(this.authfire.auth.currentUser){
      return true;  
    }
  }
  constructor(private authfire : AngularFireAuth, private route : Router ) { }

}
