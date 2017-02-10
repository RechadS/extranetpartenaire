import { Injectable }       from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';

import {Contrat, User} from '../entity/model';
import { ClientService }      from './client/client.service';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class ClientGuard implements CanActivate {
  private sub: any;
  private user: User = JSON.parse(localStorage.getItem("user"));

  constructor(private clientService: ClientService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let url: string = state.url;
    return this.checkCredentials(url, route);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  checkCredentials(url: string, route: ActivatedRouteSnapshot): Observable<boolean> {

    return this.clientService.checkCredentials(+route.params['id'], this.user.id)
              .map(
                result => {
                  if(result == false) {
                    this.clientService.redirectUrl = url;
                    // Navigate to the home page
                    this.router.navigate(['/private', 'home']);
                  }
                  return result;
                }                  
              );
  }
}
