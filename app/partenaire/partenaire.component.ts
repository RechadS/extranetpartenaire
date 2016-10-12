import { Component } from '@angular/core';
import {Entreprise, Contrat, User} from '../authentication.service';

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
  selector: 'app-client',
  templateUrl: 'partenaire.component.html',
  styleUrls: ['partenaire.component.css']
})

export class PartenaireComponent {

  partenaires = [
    new Partenaire(1,'Aliquet Limited', '123456789', 'johndoe@example.com', '01 47 85 43 64', 'Partenaire', null, null, 15200),
    new Partenaire(2,'Eleifend Foundation','123456789', 'litora@est.com', '01 98 63 24 85', 'Partenaire', null, null, 15200),
    new Partenaire(3,'Dapibus Industries','123456789', 'malesuada@mattis.com', '03 54 85 21 63', 'Partenaire', null, null, 15200),
    new Partenaire(4,'Condimentum','123456789', 'vel.quam@dolor.net', '01 96 45 85 42', 'Partenaire', null, null, 15200),
    new Partenaire(5,'Suspendisse','123456789', 'auctor@mauris.net', '04 25 47 62 85', 'Partenaire', null, null, 15200),
    new Partenaire(6,'Volutpat','123456789', 'quis@ultricessitamet.net', '01 94 85 46 37', 'Partenaire', null, null, 15200)
  ];



}
