import { Component, ElementRef } from '@angular/core';
import {AuthenticationService, User} from '../authentication.service';



import 'node_modules/custom/classie/index.js';
import 'node_modules/custom/selectFx/index.js';
import 'node_modules/custom/inputlabel/index.js';

declare var classie: any;
declare var SelectFxJs: any;
declare var inputlabel: any;

@Component({
  moduleId: module.id,
  selector: 'login-form',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [AuthenticationService]
})

export class LoginComponent{
 
    public user = new User('','');
    public errorMsg = '';
 
    constructor(
        private _service:AuthenticationService) {        
    }
 
    login() {
        if(!this._service.login(this.user)){
            this.errorMsg = 'Failed to login';
        } else {
          this.errorMsg = '';
        }
    }

    ngOnInit() {
      inputlabel.inputlabelcheck();
    }



   
}