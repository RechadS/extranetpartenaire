import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientComponent } from './client/client.component';
import { ListClientComponent } from './list-client/list-client.component';

import { ClientGuard } from './client-guard.service';

export const clientroutes: Routes  = [
  	{ path: 'clients', component: ListClientComponent},
	{ path: 'clients/:id', component: ClientComponent, canActivate: [ClientGuard]},
];

export const clientRouting: ModuleWithProviders = RouterModule.forChild(clientroutes);

