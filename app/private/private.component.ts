import { Component, OnInit } from '@angular/core';
import { Router }              from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import { LeftsidebarComponent } from '../leftsidebar'; 


@Component({
  moduleId: module.id,
  selector: 'login-form',
  providers: [AuthenticationService],
  templateUrl: 'private.component.html',
  styleUrls: ['private.component.css']
})


export class PrivateComponent implements OnInit {

  	constructor(private router: Router,
	    private _service:AuthenticationService){
  		
  	}

	ngOnInit(){
	   
	}

	logout() {
	    this._service.logout();
	}

}
