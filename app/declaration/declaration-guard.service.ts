import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';
import {Entreprise, Contrat, User} from '../authentication.service';
import { DeclarationService }      from './declaration.service';

@Injectable()
export class DeclarationGuard implements CanActivate {
  private sub: any;
  private user: User = JSON.parse(localStorage.getItem("user"));
  private declaration: Contrat = new Contrat(null, null, null, '', '',null, null, null, '', null, null, null, null);

  constructor(private declarationService: DeclarationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkCredits(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkCredits(url: string): boolean {
    
    if(this.declarationService.checkCredits) {
      return true;
    }
    // Store the attempted URL for redirecting
    this.declarationService.redirectUrl = url;

    // Navigate to the home page with extras
    this.router.navigate(['/private', 'home']);
    return false;
  }
}
