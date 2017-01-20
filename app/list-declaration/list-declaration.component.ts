import { Component, OnInit } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {AuthenticationService, Entreprise, Contrat, User} from '../authentication.service';
import {ListDeclarationService} from './list-declaration.service';

@Component({
  moduleId: module.id,
  selector: 'list-declaration',
  templateUrl: 'list-declaration.component.html',
  styleUrls: ['list-declaration.component.css']
})

export class ListDeclarationComponent implements OnInit {

	public declarations : Contrat[];
	public user: User = JSON.parse(localStorage.getItem("user"));
  public isadmin : boolean =false;
  public isResponsable : boolean =false;
	public listExist :boolean = false;
	public errorMsg : String;

	constructor(private listService: ListDeclarationService, private http: Http, private auth: AuthenticationService) {
		this.listService.getListDeclarations(this.user).subscribe(
                       declarations =>  {
                       	if(declarations != null && declarations.length > 0) {
                       		this.listExist = true;
                       		this.declarations = declarations;
                       	}else{
                       		this.errorMsg = "Aucune déclaration en cours"
                       	}
                       }
                       	,
                       error => this.errorMsg = 'Les déclarations n\'ont pas pu être chargés'
                       );
    if(this.user.role.id == 1 || this.user.role.id == 2){
      this.isadmin = true;
    }
    if(this.user.role.id == 3){
      this.isResponsable = true;
    }
	}

	ngOnInit() {

	}

}
