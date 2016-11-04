import { Component, ElementRef } from '@angular/core';
import {AuthenticationService, User} from '../authentication.service';
import {Router, ActivatedRoute } from '@angular/router';
import { Observable }       from 'rxjs/Observable';



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
 
    public user = new User( null, '', '', '','', null, null, null);
    public errorMsg = '';
    public id: number;
    public isLoggedIn: boolean;
    
    constructor(
        private _service:AuthenticationService, private router: Router, private route: ActivatedRoute) {        
    }
 
    login() {
        this._service.login(this.user)
                     .subscribe(
                       user =>  {
                          this.user = user; 
                          this.isLoggedIn = true;
                          console.log(this.isLoggedIn);
                          this._service.isLoggedIn = true;
                          localStorage.setItem("user", JSON.stringify(this.user));
                                 
                          this.router.navigate(['/private', 'home'], {relativeTo: this.route});
                                /*
                          this._service.getEntreprise(this.user).subscribe(
                               entreprise =>  {
                                 this.user.entreprise = entreprise;
                                 
                                alert(localStorage.getItem("user"));
                               },
                               error =>  this.errorMsg = 'Failed to login');
                            */
                       },
                       error =>  this.errorMsg = 'Identifiants incorrects');
    }

    ngOnInit() {
      inputlabel.inputlabelcheck();
    }



   
}