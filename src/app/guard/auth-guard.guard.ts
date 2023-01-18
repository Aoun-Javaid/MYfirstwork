import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthServiceService} from "../services/auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private Authguardservice: AuthServiceService, private router: Router) {
  }
  canActivate(): boolean {
    if (!this.Authguardservice.gettoken()) {
      this.router.navigateByUrl("/client/login");
    }
    return this.Authguardservice.gettoken();
  }

}
