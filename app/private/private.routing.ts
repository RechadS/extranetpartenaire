import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PrivateComponent} from './private.component';
import { HomeComponent } from '../home/home.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { DocumentationComponent } from '../documentation/documentation.component';

import { ContactComponent } from '../contact/contact.component';


import { AuthGuard } from '../authentication-guard.service';
import { AdminGuard } from '../admin-guard.service';

import { declarationroutes }  from '../declaration/declaration.routing';
import { partenaireroutes }  from '../partenaire/partenaire.routing';
import { clientroutes }  from '../client/client.routing';

export const privateroutes: Routes  = [
  {path: '', redirectTo : 'private/home', pathMatch:'full'},
  { 
  	path: 'private', component: PrivateComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
		children:[
			{ path: 'home', component: HomeComponent},
			...declarationroutes,
			...partenaireroutes,
			...clientroutes,
			
			{ path: 'documentation', component: DocumentationComponent},
			
			{ path: 'partenaires/:id/adduser', component: AddUserComponent, canActivate: [AdminGuard]},
			
			{ path: 'contact', component: ContactComponent}
		],
	}
	]
	}
];

export const privateRouting: ModuleWithProviders = RouterModule.forChild(privateroutes);

