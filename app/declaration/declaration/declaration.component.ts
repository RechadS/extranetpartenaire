import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {Entreprise, Contrat, User} from '../../entity/model';
import {DeclarationService} from './declaration.service';
import * as moment from 'moment';

@Component({
  moduleId: module.id,
  selector: 'app-declaration',
  templateUrl: 'declaration.component.html',
  styleUrls: ['declaration.component.css']
})
export class DeclarationComponent implements OnInit {
  public title: string = "";
	public client = new Entreprise(null, '', '', '', '', '', null);
	public user: User = JSON.parse(localStorage.getItem("user"));
	public declaration: Contrat = new Contrat(null, null, null, null, '',null, null, null, '', null, this.client, null, null);
	private sub: any;
	public tovalidate: boolean = false;
  public validate: boolean = false;
  public win: boolean = false;
	public isadmin: boolean = false;
  public isresponsable: boolean = false;
	public msg: string = "";
  public isDeclaration = false;

  constructor(private ref: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private declarationService: DeclarationService,
    private datePipe: DatePipe) {
  	moment.locale('fr');
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.declaration.id = +params['id']; // (+) converts string 'id' to a number
       this.declarationService
          .getDeclaration(+params['id'])
          .subscribe(declaration => {
            this.declaration = declaration;
            this.ref.reattach();
            this.declaration.commandeLogiciels = declaration.commandeLogiciels;
            if(this.declaration.statut == "Déclarée") {
              this.tovalidate = true;
            }
            if(this.declaration.statut == "Validée") {
              this.validate = true;
            }
            if(this.declaration.statut == "Gagnée") {
              this.title = "Contrat";
              this.win = true;
            } else{
              this.title = "Déclaration";
              this.isDeclaration = true;
            }
            this.ref.reattach();
          },
          error => {
            this.msg = ("Impossible de récupérer le contrat")
          });
    });

    if(this.user.role.id == 1 || this.user.role.id == 2) {
      this.isadmin = true;
      this.ref.reattach();
    }
    if(this.user.role.id == 3) {
      this.isresponsable = true;
      this.ref.reattach();
    }
  }

  updatesatut(statut: String){
  	this.declaration.statut = statut;
  	this.declarationService
  		.putStatut(this.declaration)
  		.subscribe(declaration => {
          	if(this.declaration.statut == "Validée") {
		    	this.validate = true;
		    }
          	this.msg = "La déclaration a été "+this.declaration.statut;
          	this.ref.reattach();
          },
          error => {
          	this.msg = "Impossible de mettre à jour la déclaration";
          	this.ref.reattach();
          });
  }

  stringToDate(_date: string,_format: string,_delimiter: string)
{
            let formatLowerCase=_format.toLowerCase();
            let formatItems=formatLowerCase.split(_delimiter);
            let dateItems=_date.split(_delimiter);
            let monthIndex=formatItems.indexOf("mm");
            let dayIndex=formatItems.indexOf("dd");
            let yearIndex=formatItems.indexOf("yyyy");
            let month=parseInt(dateItems[monthIndex]);
            month-=1;
            let formatedDate = new Date(parseInt(dateItems[yearIndex]),month,parseInt(dateItems[dayIndex]));
            return formatedDate;
}

}
