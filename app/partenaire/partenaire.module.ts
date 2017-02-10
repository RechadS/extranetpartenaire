import { NgModule }       from '@angular/core';
import { CommonModule, DatePipe }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { ListPartenaireComponent } from './list-partenaire/list-partenaire.component';
import { PartenaireComponent } from './partenaire/partenaire.component';
import { AddPartenaireComponent } from './add-partenaire/add-partenaire.component';

import { AddPartenaireService } from './add-partenaire/add-partenaire.service';
import { PartenaireService} from './partenaire/partenaire.service';
import { ListPartenaireService} from './list-partenaire/list-partenaire.service';

import { AuthenticationService } from '../authentication.service';

import { partenaireRouting } from './partenaire.routing';

import { AdminGuard } from '../admin-guard.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    FormsModule,
    partenaireRouting
  ],
  declarations: [
    AddPartenaireComponent,
    PartenaireComponent,
    ListPartenaireComponent    
  ],
  exports: [
    AddPartenaireComponent,
    PartenaireComponent,
    ListPartenaireComponent
  ],
  providers: [
    AuthenticationService, ListPartenaireService, PartenaireService, AddPartenaireService,
    AdminGuard, DatePipe
  ]
})
export class PartenaireModule {}