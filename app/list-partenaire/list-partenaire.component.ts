import { Component } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {AuthenticationService, Entreprise, Contrat, User} from '../authentication.service';
import {ListPartenaireService} from './list-partenaire.service';

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
  selector: 'app-partenaires',
  templateUrl: 'list-partenaire.component.html',
  styleUrls: ['list-partenaire.component.css']
})

export class ListPartenaireComponent {

  partenaires: Partenaire[];

  errorMsg : String;

  constructor(private listService: ListPartenaireService, private http: Http, private auth: AuthenticationService){
    this.listService.getListPartenaires().subscribe(
                       partenaires =>  {
                         if(partenaires != null) {
                           this.partenaires = partenaires;
                            let length: number = this.partenaires.length;
                            for (var i = 0; i < length; ++i) {

                              this.partenaires[i].montant = 0;
                              
                              if(this.partenaires[i].contrats != null) {
                                for (var j = 0; j < this.partenaires[i].contrats.length; ++j) {
                                  if(this.partenaires[i].contrats[j].montant != null) {

                                    this.partenaires[i].montant += this.partenaires[i].contrats[j].montant;
                                  }
                                   
                                }
                              }
                            }
                         }else{
                           this.errorMsg = "Aucune partenaire"
                         }
                         
                       }
                         ,
                       error => this.errorMsg = 'Les partenaires n\'ont pas pu être chargés'
                       );

    



}
}
