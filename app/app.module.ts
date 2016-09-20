import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    PrivateModule
  ],
  providers: [appRoutingProviders ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})

export class AppModule {

}