import { NgModule }       from '@angular/core';
import { CommonModule, DatePipe }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import {PrivateComponent} from './private.component';
import { HomeComponent } from '../home/home.component';
import { DocumentationComponent } from '../documentation/documentation.component';

import { ContactComponent } from '../contact/contact.component';
import { LeftsidebarComponent } from '../leftsidebar/leftsidebar.component'; 
import { AddUserComponent } from '../add-user/add-user.component';

import { AddUserService } from '../add-user/add-user.service';
import { ContactService } from '../contact/contact.service';
import { AuthenticationService } from '../authentication.service';

import { privateRouting } from './private.routing';

import { AdminGuard } from '../admin-guard.service';

import { DeclarationModule }         from '../declaration/declaration.module';
import { PartenaireModule }         from '../partenaire/partenaire.module';
import { ClientModule }         from '../client/client.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    FormsModule,
    DeclarationModule,
    PartenaireModule,
    ClientModule,
    privateRouting
  ],
  declarations: [
    PrivateComponent,
    LeftsidebarComponent,
    HomeComponent,
    DocumentationComponent,
    ContactComponent,
    AddUserComponent
    
  ],
  exports: [
    PrivateComponent,
    LeftsidebarComponent,
    HomeComponent,
    DocumentationComponent,
    ContactComponent,
    AddUserComponent
  ],
  providers: [
    AuthenticationService, AddUserService, ContactService, AdminGuard, DatePipe
  ]
})
export class PrivateModule {}