import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import {PrivateComponent} from './private.component';
import { HomeComponent } from '../home/home.component';
import { AddDeclarationComponent } from '../add-declaration/add-declaration.component';
import { ListDeclarationComponent } from '../list-declaration/list-declaration.component';
import { DocumentationComponent } from '../documentation/documentation.component';
import { ClientComponent } from '../client/client.component';
import { ListPartenaireComponent } from '../list-partenaire/list-partenaire.component';
import { ContratComponent } from '../contrat/contrat.component';
import { ContactComponent } from '../contact/contact.component';
import { LeftsidebarComponent } from '../leftsidebar/leftsidebar.component'; 
import { DeclarationComponent } from '../declaration/declaration.component';
import { PartenaireComponent } from '../partenaire/partenaire.component';
import { AddPartenaireComponent } from '../add-partenaire/add-partenaire.component';
import { ListUserComponent } from '../list-user/list-user.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { ListClientComponent } from '../list-client/list-client.component';


import {AddDeclarationService} from '../add-declaration/add-declaration.service';
import { AddPartenaireService } from '../add-partenaire/add-partenaire.service';
import { AddUserService } from '../add-user/add-user.service';
import {DeclarationService} from '../declaration/declaration.service';
import {ListDeclarationService} from '../list-declaration/list-declaration.service';
import {PartenaireService} from '../partenaire/partenaire.service';
import {ListPartenaireService} from '../list-partenaire/list-partenaire.service';
import { ClientService } from '../client/client.service';
import { ListClientService } from '../list-client/list-client.service';
import { ContactService } from '../contact/contact.service';
import { AuthenticationService } from '../authentication.service';
import { privateRouting } from './private.routing';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    FormsModule,
    privateRouting
  ],
  declarations: [
    PrivateComponent,
    LeftsidebarComponent,
    HomeComponent,
    AddDeclarationComponent,
    ListDeclarationComponent,
    DocumentationComponent,
    ClientComponent,
    AddPartenaireComponent,
    PartenaireComponent,
    ListPartenaireComponent,
    ContratComponent,
    ContactComponent,
    DeclarationComponent,
    ListUserComponent,
    AddUserComponent,
    ListClientComponent
  ],
  exports: [
    PrivateComponent,
    LeftsidebarComponent,
    HomeComponent,
    AddDeclarationComponent,
    ListDeclarationComponent,
    DocumentationComponent,
    ClientComponent,
    AddPartenaireComponent,
    PartenaireComponent,
    ListPartenaireComponent,
    ContratComponent,
    ContactComponent,
    DeclarationComponent,
    ListUserComponent,
    AddUserComponent,
    ListClientComponent
  ],
  providers: [
    AuthenticationService, AddDeclarationService, ListDeclarationService, DeclarationService, ListPartenaireService,
    PartenaireService, AddPartenaireService, AddUserService, ListClientService, ClientService, ContactService
  ]
})
export class PrivateModule {}