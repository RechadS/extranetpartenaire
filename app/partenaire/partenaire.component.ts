import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {AuthenticationService, Entreprise, Contrat, User} from '../authentication.service';
import {PartenaireService} from './partenaire.service';
import {Partenaire} from '../list-partenaire/list-partenaire.component';

@Component({
  moduleId: module.id,
  selector: 'partenaire',
  templateUrl: 'partenaire.component.html',
  styleUrls: ['partenaire.component.css']
})

export class PartenaireComponent implements OnInit {

	public contrats : Contrat[];
  public partenaire: Partenaire = new Partenaire(null, "", "", "", "", "", null, null, 0);
	public user: User = JSON.parse(localStorage.getItem("user"));
  private sub: any;
	public listExist :boolean = false;
	public errorMsg : String;
  public isadmin: boolean = false;


	constructor(private partenaireService: PartenaireService, private route: ActivatedRoute, private http: Http, private auth: AuthenticationService) {
    this.sub = this.route.params.subscribe(params => {
    this.partenaireService.getPartenaire(+params['id']).subscribe(
                       partenaire =>  {this.partenaire = partenaire;},
                       error => {this.errorMsg = "Partenaire Introuvable";}
                       );
		this.partenaireService.getListContrats(+params['id']).subscribe(
                       contrats =>  {
                       	if(contrats != null && contrats.length>0) {
                       		this.listExist = true;
                       		this.contrats = contrats;
                       	}else{
                       		this.errorMsg = "Aucun contrat en cours"
                       	}
                       	
                       }
                       	,
                       error => {
                         this.errorMsg = 'Les contrats n\'ont pas pu être chargés';
                       }
                       );
    });

    if(this.user.role.id == 1 || this.user.role.id == 2) {
      this.isadmin = true;
    }
	}

	ngOnInit() {

	}

}
