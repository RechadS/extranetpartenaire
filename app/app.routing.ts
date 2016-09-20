import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { loginRoutes,
         authProviders }  from './login/login.routing';
import { privateroutes }  from './private/private.routing';

import { CanDeactivateGuard } from './can-deactivate-guard.service';

const appRoutes: Routes = [
  ...loginRoutes,
  ...privateroutes
];	

export const appRoutingProviders: any[] = [
	authProviders,
  	CanDeactivateGuard
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
