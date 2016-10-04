import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PrivateComponent} from './private.component';
import { HomeComponent } from '../home/home.component';
import { AddDeclarationComponent } from '../add-declaration/add-declaration.component';
import { ListDeclarationComponent } from '../list-declaration/list-declaration.component';
import { DeclarationComponent } from '../declaration/declaration.component';
import { DocumentationComponent } from '../documentation/documentation.component';
import { ClientComponent } from '../client/client.component';
import { ContratComponent } from '../contrat/contrat.component';
import { ContactComponent } from '../contact/contact.component';

import { AuthGuard } from '../authentication-guard.service';

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
			{ path: 'declarer', component: AddDeclarationComponent},
			{ path: 'declarations', component: ListDeclarationComponent},
			{ path: 'declarations/:id', component: DeclarationComponent},
			{ path: 'documentation', component: DocumentationComponent},
			{ path: 'client', component: ClientComponent},
			{ path: 'contact', component: ContactComponent}
		],
	}
	]
	}
  
];

export const privateRouting: ModuleWithProviders = RouterModule.forChild(privateroutes);

