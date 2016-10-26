import { Component } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {AuthenticationService, Entreprise, Contrat, User} from '../authentication.service';
import {ListPartenaireService} from '../list-partenaire/list-partenaire.service';

export class Client {
  constructor(public id: number, public raisonsociale: string, public email: string,
    public telephone: string, public nbContrats: number, public montantContrats: number) { }
}

export class Partenaire extends Entreprise{
  constructor(public id: number, public raisonsociale: string, public siret: string, public email: String,
    public telephone: String, public role: string, public users: User[], public contrats: Contrat[], public montant: number ) {
    super(id, raisonsociale, siret, email, telephone, role, users);
    this.contrats = contrats;
    this.montant = montant;
    }
}

@Component({
  moduleId: module.id,
  selector: 'app-users',
  templateUrl: 'list-user.component.html',
  styleUrls: ['list-user.component.css']
})

export class ListUserComponent {

  public partenaires: Partenaire[];
  public partenaireselected: Partenaire =  new Partenaire(0, "", "", "", "", "", null, null, 0);

  errorMsg : String;

  constructor(private listService: ListPartenaireService, private http: Http, private auth: AuthenticationService){
    this.listService.getListPartenaires().subscribe(
                       partenaires =>  {
                         if(partenaires != null) {
                           this.partenaires = partenaires;
                           console.log(this.partenaires);
                         }else{
                           this.errorMsg = "Aucune déclaration en cours"
                         }
                         
                       }
                         ,
                       error => console.log('Les déclarations n\'ont pas pu être chargés')
                       );

    



}
}
