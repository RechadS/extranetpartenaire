import { NgModule }       from '@angular/core';
import { CommonModule, DatePipe }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { ClientComponent } from './client/client.component';
import { ListClientComponent } from './list-client/list-client.component';

import { ClientService } from './client/client.service';
import { ListClientService } from './list-client/list-client.service';

import { AuthenticationService } from '../authentication.service';

import { clientRouting } from './client.routing';

import { ClientGuard } from './client-guard.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    FormsModule,
    clientRouting
  ],
  declarations: [
    ClientComponent,
    ListClientComponent   
  ],
  exports: [
    ClientComponent,
    ListClientComponent,
  ],
  providers: [
    AuthenticationService, ListClientService, ClientService,
    ClientGuard, DatePipe
  ]
})
export class ClientModule {}