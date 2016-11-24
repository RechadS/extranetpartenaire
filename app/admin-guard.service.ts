import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import {AuthenticationService, User} from './authentication.service';

@Injectable()
export class AdminGuard implements CanActivate {

  private user: User = JSON.parse(localStorage.getItem("user"));

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkCredentials(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkCredentials(url: string): boolean {
    
    if(this.user.role.id == 1 || this.user.role.id == 2 ) {
      return true;
    }
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the home page with extras
    this.router.navigate(['/private', 'home']);
    return false;
  }
}
