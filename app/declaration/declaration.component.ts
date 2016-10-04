import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Entreprise, Contrat, User} from '../authentication.service';
import {DeclarationService} from './declaration.service';

@Component({
  moduleId: module.id,
  selector: 'app-declaration',
  templateUrl: 'declaration.component.html',
  styleUrls: ['declaration.component.css']
})
export class DeclarationComponent implements OnInit {
	public client = new Entreprise(null, '', '', '', null);
	public user: User = JSON.parse(localStorage.getItem("user"));
	public declaration: Contrat = new Contrat(null, null, null, '', '',null, null, null, '', null, this.client, null, null);;
	private sub: any;
	public validate: boolean = false;
	public isadmin: boolean = false;

  constructor(private route: ActivatedRoute, private declarationService: DeclarationService) {
  	this.sub = this.route.params.subscribe(params => {
       this.declaration.id = +params['id']; // (+) converts string 'id' to a number
       this.declarationService
          .getDeclaration(+params['id'])
          .subscribe(declaration => {
          	this.declaration = declaration;
          	if(this.declaration.statut == "Validée") {
		    	this.validate = true;
		    }
          	console.log(declaration);
          },
          error => {
          	console.log("Impossible de récupérer le contrat")
          });
    });

    if(this.user.role.id == 1 || this.user.role.id == 2) {
    	this.isadmin = true;
    }


  }

  ngOnInit() {
  }

}
