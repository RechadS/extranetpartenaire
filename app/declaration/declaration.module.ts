import { NgModule }       from '@angular/core';
import { CommonModule, DatePipe }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { AddDeclarationComponent } from './add-declaration/add-declaration.component';
import { ListDeclarationComponent } from './list-declaration/list-declaration.component';
import { DeclarationComponent } from './declaration/declaration.component';
import { DeclarationEditComponent } from './declaration-edit/declaration-edit.component';

import { AddDeclarationService} from './add-declaration/add-declaration.service';
import { DeclarationService} from './declaration/declaration.service';
import { DeclarationEditService } from './declaration-edit/declaration-edit.service';
import { ListDeclarationService} from './list-declaration/list-declaration.service';

import { AuthenticationService } from '../authentication.service';
import { declarationRouting } from './declaration.routing';

import { DeclarationGuard } from './declaration-guard.service';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    FormsModule,
    declarationRouting
  ],
  declarations: [
    AddDeclarationComponent,
    ListDeclarationComponent,
    DeclarationComponent,
    DeclarationEditComponent,
    
  ],
  exports: [
    
    AddDeclarationComponent,
    ListDeclarationComponent,
    
    
    DeclarationComponent,
    DeclarationEditComponent,
  ],
  providers: [
    AuthenticationService, AddDeclarationService, ListDeclarationService, DeclarationService, DeclarationEditService,
    DeclarationGuard, DatePipe
  ]
})
export class DeclarationModule {}