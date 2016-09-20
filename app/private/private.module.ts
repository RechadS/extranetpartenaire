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
import { ContratComponent } from '../contrat/contrat.component';
import { ContactComponent } from '../contact/contact.component';
import { LeftsidebarComponent } from '../leftsidebar/leftsidebar.component'; 


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
    ContratComponent,
    ContactComponent
  ],
  exports: [
    PrivateComponent,
    LeftsidebarComponent,
    HomeComponent,
    AddDeclarationComponent,
    ListDeclarationComponent,
    DocumentationComponent,
    ClientComponent,
    ContratComponent,
    ContactComponent
  ],
  providers: [
    AuthenticationService
  ]
})
export class PrivateModule {}