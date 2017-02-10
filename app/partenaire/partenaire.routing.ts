import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPartenaireComponent } from './add-partenaire/add-partenaire.component';
import { ListPartenaireComponent } from './list-partenaire/list-partenaire.component';
import { PartenaireComponent } from './partenaire/partenaire.component';

import { AdminGuard } from '../admin-guard.service';

export const partenaireroutes: Routes  = [
  	{ path: 'partenaires', component: ListPartenaireComponent, canActivate: [AdminGuard]},
	{ path: 'partenaires/:id', component: PartenaireComponent, canActivate: [AdminGuard]},
	{ path: 'partenaires-add', component: AddPartenaireComponent, canActivate: [AdminGuard]},
];

export const partenaireRouting: ModuleWithProviders = RouterModule.forChild(partenaireroutes);

