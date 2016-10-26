import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PrivateComponent} from './private.component';
import { HomeComponent } from '../home/home.component';
import { AddDeclarationComponent } from '../add-declaration/add-declaration.component';
import { ListDeclarationComponent } from '../list-declaration/list-declaration.component';
import { DeclarationComponent } from '../declaration/declaration.component';
import { AddPartenaireComponent } from '../add-partenaire/add-partenaire.component';
import { ListPartenaireComponent } from '../list-partenaire/list-partenaire.component';
import { PartenaireComponent } from '../partenaire/partenaire.component';
import { ListUserComponent } from '../list-user/list-user.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { DocumentationComponent } from '../documentation/documentation.component';
import { ClientComponent } from '../client/client.component';
import { ListClientComponent } from '../list-client/list-client.component';
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
			{ path: 'contrat/:id', component: DeclarationComponent},
			{ path: 'documentation', component: DocumentationComponent},
			{ path: 'clients', component: ListClientComponent},
			{ path: 'clients/:id', component: ClientComponent},
			{ path: 'partenaires', component: ListPartenaireComponent},
			{ path: 'partenaires/:id', component: PartenaireComponent},
			{ path: 'partenaires-add', component: AddPartenaireComponent},
			{ path: 'partenaires/:id/adduser', component: AddUserComponent},
			{ path: 'utilisateurs', component: ListUserComponent},
			{ path: 'contact', component: ContactComponent}
		],
	}
	]
	}
  
];

export const privateRouting: ModuleWithProviders = RouterModule.forChild(privateroutes);

