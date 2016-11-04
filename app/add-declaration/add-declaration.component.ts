import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {AuthenticationService, Entreprise, Contrat, User, Logiciel, CommandeLogiciel} from '../authentication.service';
import {AddDeclarationService} from './add-declaration.service';
declare var classie: any;
declare var SelectFxJs: any;
declare var inputlabel: any;
declare var jQuery:any;


export class Declaration {
  constructor(public raisonsociale: string, public siret: string, public nomcontact: string, 
  	public origine: string, public dateContact: Date, public dateSignature: Date) { }
}

@Component({
  moduleId: module.id,
  selector: 'add-declaration',
  templateUrl: 'add-declaration.component.html',
  styleUrls: ['add-declaration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddDeclarationComponent implements OnInit {
  public client = new Entreprise(null, '', '', '', '', '', null);
  public user: User = JSON.parse(localStorage.getItem("user"));
  public declaration = new Contrat(null, null, null, '', '',null, null, 0, '', this.user, this.client, null, null);
  public submitMsg: string;
  public commandes: Array<CommandeLogiciel> = [];
  public commande: CommandeLogiciel = new CommandeLogiciel(null, 1, 0, null, null, null);
  public nbCommande: number = 1;
  public successMsg: String;
  public logiciels: Logiciel[];
  public showSubmit: boolean =true;
  public showLoading: boolean =false;
  public showMessage: boolean =false;

  constructor(private ref: ChangeDetectorRef, private addService: AddDeclarationService,
     private http: Http, private auth: AuthenticationService){
      this.declaration.client = this.client;
      this.addService.getListLogiciel().subscribe(
                       logiciels =>  {
                         this.logiciels = logiciels;
                         this.ref.reattach();
                       },
                       error => console.log('Les logiciels n\'ont pas pu être chargés')
                       );

    this.commandes.push(this.commande);
  }
  ngOnInit() {
    jQuery.noConflict();
    jQuery('#dateContact').datepicker({ dateFormat: 'yy-mm-dd' });
    jQuery('#dateSignature').datepicker({ dateFormat: 'yy-mm-dd' });
  	inputlabel.inputlabelcheck();
    
  }

  newCommandelogiciel(){
    let newcommande : CommandeLogiciel = new CommandeLogiciel(null, 1, 0, null, null, null);
    this.commandes.push(newcommande);
  }
  
  addDeclaration(){
    if(jQuery('#dateContact').val() != '') {
      this.declaration.datecontact = jQuery('#dateContact').val();
    }
    if(jQuery('#dateSignature').val() != '') {
      this.declaration.datesignature = jQuery('#dateSignature').val();
    }
    this.showSubmit = false;
    this.showLoading = true;
    if(this.showLoading) {
      this.addService.checkDeclaration(this.declaration).subscribe(
          declaration => {
            //If there is no existing declaration for this client
            if(!declaration){
              
              this.declaration.statut = "Déclarée";
              this.declaration.commandeLogiciels = this.commandes;
              this.addService.postDeclaration(this.declaration).subscribe(
                declaration => {
                  // If the declaration has been created in DB
                  if(declaration) {
                    this.showLoading = false;
                    this.successMsg = "Déclaration effectuée";
                    this.showMessage = true;
                    this.ref.reattach();
                    let objet = "Nouvelle déclaration effectuée par " + this.user.entreprise.raisonsociale;
                    let message = " Une nouvelle déclaration a été effectuée par " + this.user.prenom + " "
                    + this.user.nom + " de "  + this.user.entreprise.raisonsociale + " concernant la société "
                    + this.declaration.client.raisonsociale + "\n\nLes logiciels concernés sont:\n";
                    for (var i = 0; i < this.declaration.commandeLogiciels.length; ++i) {
                      message += "\n" + this.declaration.commandeLogiciels[i].logiciel.titre
                              + ", nombre d'accès: " +this.declaration.commandeLogiciels[i].nbacces;
                    }
                    this.addService.sendMail(objet, message).subscribe(
                      message => console.log("Le mail a été envoyé"),
                      error => console.log("Le mail n'a pas été envoyé")
                      );
                    
                  } else{
                    this.showLoading = false;
                    this.successMsg = "La déclaration a échouée";
                    this.showMessage = true;
                    this.showSubmit = true;
                    this.ref.reattach();
                  }
                },
                error => {
                  this.showLoading = false;
                  this.successMsg = "La déclaration a échouée"
                  this.showMessage = true;
                  this.showSubmit = true;
                  this.ref.reattach();
                  }
              );
              
            } else {
              this.showLoading = false;
              this.successMsg = "Une affaire concernant cette entreprise a déjà été déclarée";
              this.showMessage = true;
              this.ref.reattach();
            }
          },
          error => {
            this.showLoading = false;
            this.successMsg = "La déclaration a échouée";
            this.showMessage = true;
            this.showSubmit = true;
            this.ref.reattach();
            });
    }
    
  }

  onCommandeChange(event: Event){
    this.declaration.montant = 0;
    this.commandes.forEach( commande => {
      if(commande.logiciel != null) {
        commande.prix = commande.logiciel.prix + (commande.logiciel.prixacces * commande.nbacces) - commande.logiciel.prixacces;
        this.declaration.montant += commande.prix;
      }
      });
  }

  showHide(submit: boolean, loading: boolean, message: boolean){
    this.showSubmit = submit;
    this.showLoading = loading;
    this.showMessage = message;
  }

}
