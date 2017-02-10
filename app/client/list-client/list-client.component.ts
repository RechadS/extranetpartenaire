import { Component } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {AuthenticationService} from '../../authentication.service';
import { Entreprise, Contrat, User } from '../../entity/model';
import {ListClientService} from './list-client.service';



export class Client extends Entreprise{
  constructor(public id: number, public raisonsociale: string, public siret: string, public email: String,
    public telephone: String, public role: string, public users: User[], public contrats: Contrat[], public montant: number ) {
    super(id, raisonsociale, siret, email, telephone, role, users);
    this.contrats = contrats;
    this.montant = montant;
    }
}

@Component({
  moduleId: module.id,
  selector: 'app-clients',
  templateUrl: 'list-client.component.html',
  styleUrls: ['list-client.component.css']
})

export class ListClientComponent {

  clients: Client[];
  public user: User = JSON.parse(localStorage.getItem("user"));
  errorMsg : String;

  constructor(private listService: ListClientService, private http: Http, private auth: AuthenticationService){
    this.listService.getListClients(this.user).subscribe(
                       clients =>  {
                         if(clients != null) {
                           this.clients = clients;
                            let length: number = this.clients.length;
                            for (var i = 0; i < length; ++i) {

                              this.clients[i].montant = 0;
                              
                              if(this.clients[i].contrats != null) {
                                for (var j = 0; j < this.clients[i].contrats.length; ++j) {
                                  if(this.clients[i].contrats[j].montant != null) {

                                    this.clients[i].montant += this.clients[i].contrats[j].montant;
                                  }
                                   
                                }
                              }
                            }
                         }else{
                           this.errorMsg = "Aucun client pour le moment"
                         }
                         
                       }
                         ,
                       error => this.errorMsg = 'Les déclarations n\'ont pas pu être chargés'
                       );

    



}
}
