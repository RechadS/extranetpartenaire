import { Routes }         from '@angular/router';
import { AuthGuard }      from '../authentication-guard.service';
import { AuthenticationService }    from '../authentication.service';
import { LoginComponent } from './login.component';

export const loginRoutes: Routes = [
  { path: 'login', component: LoginComponent }
];

export const authProviders = [
  AuthGuard,
  AuthenticationService
];