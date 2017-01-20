import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {AuthenticationService, Entreprise, Contrat, User} from '../authentication.service';
import {ClientService} from './client.service';
import {Client} from '../list-client/list-client.component';

@Component({
  moduleId: module.id,
  selector: 'client',
  templateUrl: 'client.component.html',
  styleUrls: ['client.component.css']
})

export class ClientComponent implements OnInit {

	public contrats : Contrat[];
  public client: Client = new Client(null, "", "", "", "", "", null, null, 0);
	public user: User = JSON.parse(localStorage.getItem("user"));
  private sub: any;
	public listExist :boolean = false;
	public errorMsg : String;


	constructor(private clientService: ClientService, private route: ActivatedRoute, private http: Http, private auth: AuthenticationService) {
    this.sub = this.route.params.subscribe(params => {
    this.clientService.getClient(+params['id']).subscribe(
                       client =>  {this.client = client;},
                       error => {this.errorMsg = "Partenaire Introuvable";}
                       );
		this.clientService.getListContrats(+params['id'], this.user).subscribe(
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
                         this.errorMsg = ('Les contrats n\'ont pas pu être chargés');
                       }
                       );
    });
	}

	ngOnInit() {

	}

}
