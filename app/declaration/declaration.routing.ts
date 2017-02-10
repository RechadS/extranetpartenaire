import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AddDeclarationComponent } from './add-declaration/add-declaration.component';
import { ListDeclarationComponent } from './list-declaration/list-declaration.component';
import { DeclarationComponent } from './declaration/declaration.component';
import { DeclarationEditComponent } from './declaration-edit/declaration-edit.component';


import { AuthGuard } from '../authentication-guard.service';
import { DeclarationGuard } from './declaration-guard.service';

export const declarationroutes: Routes  = [
	{ path: 'declarer', component: AddDeclarationComponent },
  	{ path: 'declarations', component: ListDeclarationComponent},
	{ path: 'declarations/:id', component: DeclarationComponent, canActivate: [DeclarationGuard]},
	{ path: 'declarations/:id/edit', component: DeclarationEditComponent, canActivate: [DeclarationGuard]},

	{ path: 'contrat/:id', component: DeclarationComponent, canActivate: [DeclarationGuard]}
];

export const declarationRouting: ModuleWithProviders = RouterModule.forChild(declarationroutes);

