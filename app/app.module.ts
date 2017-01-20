import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgModule, ApplicationRef, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { routing,
         appRoutingProviders }  from './app.routing';
import { PrivateModule }         from './private/private.module';
import {LoginComponent} from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    FormsModule,
    routing,
    PrivateModule,
    JsonpModule
  ],
  providers: [
      { provide: LOCALE_ID, useValue: 'fr' }, 
      appRoutingProviders
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule {

}