import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {AuthenticationService, Entreprise, Contrat, User, Logiciel, CommandeLogiciel, LogicielCategorie} from '../authentication.service';
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
  public declaration = new Contrat(null, null, null, this.user, '',null, null, 0, '', null, this.client, null, null);
  public submitMsg: string;
  public commandes: Array<CommandeLogiciel> = [];
  public commande: CommandeLogiciel = new CommandeLogiciel(null, 1, 0, null, null, null);
  public nbCommande: number = 1;
  public successMsg: String;
  public successMsg2: String;
  public logiciels: Logiciel[];
  public responsables: User[];
  public users: User[];
  public showSubmit: boolean =true;
  public showLoading: boolean =false;
  public showMessage: boolean =false;
  public isAdmin: boolean = false;
  public isResponsable: boolean = false;
  public onPremiseInList: boolean = false;
  public nbAccesPremise: number = 0;
  public saasInList: boolean = false;
  public nbAccesSaas: number = 0;
  public prixEntreeSaas: number = 0;

  constructor(private ref: ChangeDetectorRef, private addService: AddDeclarationService,
     private http: Http, private auth: AuthenticationService){
      
  }
  ngOnInit() {

    this.declaration.client = this.client;
    this.addService.getListLogiciel().subscribe(
                     logiciels =>  {
                       this.logiciels = logiciels;
                       this.ref.reattach();
                     },
                     error => console.log('Les logiciels n\'ont pas pu être chargés')
                     );

    if(this.user.role.id == 1 || this.user.role.id == 2) {
      this.isAdmin = true;
      
      this.addService.getListResponsable().subscribe(
                     responsables =>  {
                       this.responsables = responsables;
                       this.ref.reattach();
                     },
                     error => console.log('Les responsables n\'ont pas pu être chargés')
                     );
    }

    if(this.user.role.id == 3) {
      this.isResponsable = true;
      this.addService.getListUser(this.user).subscribe(
                     users =>  {
                       this.users = users;
                       this.ref.reattach();
                     },
                     error => console.log('Les responsables n\'ont pas pu être chargés')
                     );
    }
    this.commandes.push(this.commande);

    jQuery.noConflict();
    jQuery('#dateContact').datepicker({ dateFormat: 'dd/mm/yy' });
    jQuery('#dateSignature').datepicker({ dateFormat: 'dd/mm/yy' });
  	inputlabel.inputlabelcheck();
  }

  newCommandelogiciel(){
    let newcommande : CommandeLogiciel = new CommandeLogiciel(null, 1, 0, null, null, null);
    this.commandes.push(newcommande);
  }
  
  addDeclaration(){
    this.successMsg = "";
      this.showMessage = false;
      this.ref.reattach();
    if(jQuery('#dateContact').val() != '') {
      this.declaration.datecontact = jQuery('#dateContact').val();
    }
    if(jQuery('#dateSignature').val() != '') {
      this.declaration.datesignature = jQuery('#dateSignature').val();
    }
    if(this.user.role.id == 4) {
      this.declaration.user = this.user;
    }
    if(this.client.siret.length != 14) {
      this.successMsg = "Veuillez saisir un N° de SIRET à 14 chiffres";
      this.showMessage = true;
      this.ref.reattach();
      return;
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
                      message => {
                        this.showLoading = false;
                        this.successMsg2 = "Un mail a été envoyé à AddenDa Software afin de notifier votre déclaration";
                        this.ref.reattach();
                      },
                      error => {
                        this.successMsg2 = "L'envoi d'un mail à AddenDa Software a échoué";
                      }
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
    this.onPremiseInList = false;
    this.nbAccesPremise = 0;
    this.saasInList = false;
    this.nbAccesSaas = 0;
    this.prixEntreeSaas = 0;
    this.commandes.forEach( commande => {

      commande.prix = 0;

      if(commande.logiciel != null) {

        if(commande.logiciel.categorie.libelle == 'On Premise') {

          if(!this.onPremiseInList) {

            commande.prix = commande.logiciel.prix + (commande.logiciel.prixacces * ( commande.nbacces - 1 ) );
            this.nbAccesPremise = commande.nbacces;
            this.onPremiseInList = true;

          } else{

            if(commande.nbacces > this.nbAccesPremise) {

              let nbAccesToAdd = commande.nbacces - this.nbAccesPremise;
              commande.prix = commande.logiciel.prix + (nbAccesToAdd * commande.logiciel.prixacces);
              this.nbAccesPremise = commande.nbacces;

            } else{
              commande.prix = commande.logiciel.prix;
            }

          }

          this.declaration.montant += commande.prix;

        } else{

            if(!this.saasInList) {

              this.prixEntreeSaas = commande.logiciel.prixentree;
              commande.prix = commande.logiciel.prixentree + (commande.logiciel.prix + (commande.logiciel.prixacces * (commande.nbacces-1) ) )  * commande.logiciel.duree;
              this.saasInList = true;
              this.nbAccesSaas = commande.nbacces;
              this.prixEntreeSaas = commande.logiciel.prixentree;

            } else{

              if(commande.logiciel.prixentree > this.prixEntreeSaas) {
                let prixEntreeToAdd = commande.logiciel.prixentree - this.prixEntreeSaas;
                commande.prix += prixEntreeToAdd;
              }
              if(commande.nbacces > this.nbAccesSaas) {
                let nbAccesToAdd = commande.nbacces - this.nbAccesSaas;
                commande.prix += ((80 + (commande.logiciel.prixacces * nbAccesToAdd) ) * commande.logiciel.duree);
                this.nbAccesSaas = commande.nbacces;
              } else{
                commande.prix += (80 * commande.logiciel.duree);
              }

            }

            this.declaration.montant += commande.prix;
        }
        

      }
      });
  }

  showHide(submit: boolean, loading: boolean, message: boolean){
    this.showSubmit = submit;
    this.showLoading = loading;
    this.showMessage = message;
  }

}
