import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {Entreprise, Contrat, User, CommandeLogiciel} from '../authentication.service';
import {DeclarationService} from '../declaration/declaration.service';
import {DeclarationEditService} from './declaration-edit.service';

declare var classie: any;
declare var SelectFxJs: any;
declare var inputlabel: any;
declare var jQuery:any;

@Component({
  moduleId: module.id,
  selector: 'app-declaration',
  templateUrl: 'declaration-edit.component.html',
  styleUrls: ['declaration-edit.component.css']
})

export class DeclarationEditComponent implements OnInit {
  public title: string = "";
	public client = new Entreprise(null, '', '', '', '', '', null);
	public user: User = JSON.parse(localStorage.getItem("user"));
	public declaration: Contrat = new Contrat(null, null, null, null, '',null, null, null, '', null, this.client, null, null);
	private sub: any;
	public isadmin: boolean = false;
	public msg: string = "";
  public successMsg: String;
  public showSubmit: boolean =true;
  public showLoading: boolean =false;
  public showMessage: boolean =false;

  public responsables: User[];
  public users: User[];
  public isAdmin: boolean = false;
  public isResponsable: boolean = false;
  public onPremiseInList: boolean = false;
  public nbAccesPremise: number = 0;
  public saasInList: boolean = false;
  public nbAccesSaas: number = 0;
  public prixEntreeSaas: number = 0;

  constructor(private ref: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private declarationService: DeclarationService,
    private editService: DeclarationEditService, private datePipe: DatePipe) {

  }

  ngOnInit() {
    jQuery.noConflict();
    
    jQuery('#dateContact').datepicker({ dateFormat: 'dd/mm/yy' });
    jQuery('#dateSignature').datepicker({ dateFormat: 'dd/mm/yy' });
    jQuery('#dateDebut').datepicker({ dateFormat: 'dd/mm/yy' });
    jQuery('#dateFin').datepicker({ dateFormat: 'dd/mm/yy' });
            
    inputlabel.inputlabelcheck();

    this.sub = this.route.params.subscribe(params => {
       this.declaration.id = +params['id']; // (+) converts string 'id' to a number
       this.declarationService
          .getDeclaration(+params['id'])
          .subscribe(declaration => {
            this.declaration = declaration;
            this.declaration.commandeLogiciels = declaration.commandeLogiciels;
            jQuery('#dateContact').val(this.datePipe.transform(this.declaration.datecontact, 'dd/MM/yyyy'));
            jQuery('#dateSignature').val(this.datePipe.transform(this.declaration.datesignature, 'dd/MM/yyyy'));
            jQuery('#dateDebut').val(this.datePipe.transform(this.declaration.datedebut, 'dd/MM/yyyy'));
            jQuery('#dateFin').val(this.datePipe.transform(this.declaration.datefin, 'dd/MM/yyyy'));
          },
          error => {
            console.log("Impossible de récupérer le contrat")
          });
    });

    
    if(this.user.role.id == 1 || this.user.role.id == 2) {
      this.isadmin = true;
      this.editService.getListResponsable().subscribe(
                     responsables =>  {
                       console.log(responsables);
                       this.responsables = responsables;
                       this.ref.reattach();
                     },
                     error => console.log('Les responsables n\'ont pas pu être chargés')
                     );

      this.ref.reattach();
    }

    if(this.user.role.id == 3) {
      this.isResponsable = true;
      this.editService.getListUser(this.user).subscribe(
                     users =>  {
                       this.users = users;
                       this.ref.reattach();
                     },
                     error => console.log('Les responsables n\'ont pas pu être chargés')
                     );
    }
  }

  deleteCommande(commande: CommandeLogiciel){
    this.editService.deleteCommandeLogiciel(commande).subscribe(
          commande => {
            if(commande) {
              let index = this.declaration.commandeLogiciels.indexOf(commande);
              this.declaration.commandeLogiciels.splice(index, 1);

              this.declaration.montant = 0;
              this.onPremiseInList = false;
              this.nbAccesPremise = 0;
              this.saasInList = false;
              this.nbAccesSaas = 0;
              this.prixEntreeSaas = 0;
              this.declaration.commandeLogiciels.forEach( commande => {

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

              this.editService.updateDeclarationMontant(this.declaration).subscribe(
                    commande => {
                    },
                    error =>{

                    }
                    );

              this.showLoading = false;
              this.successMsg = "La commande a été supprimée avec succès";
              this.showMessage = true;
              this.showSubmit = true;
              
            } else{
              this.showLoading = false;
              this.successMsg = "La commande n'a pas été supprimée";
              this.showMessage = true;
              this.showSubmit = true;
            }
            this.ref.reattach();
          },
          error => {
            this.showLoading = false;
            this.successMsg = "La commande n'a pas pu être supprimée"
            this.showMessage = true;
            this.showSubmit = true;
            this.ref.reattach();
            }
        );
  }

  updateDeclaration(){
    
    if(jQuery('#dateContact').val() != '') {
      console.log(jQuery('#dateContact').val());
      this.declaration.datecontact = jQuery('#dateContact').val();
    }
    if(jQuery('#dateSignature').val() != '') {
      this.declaration.datesignature = jQuery('#dateSignature').val();
    }
    if(jQuery('#dateDebut').val() != '') {
      this.declaration.datedebut = jQuery('#dateDebut').val();
    }
    if(jQuery('#dateFin').val() != '') {
      this.declaration.datefin = jQuery('#dateFin').val();
    }
    this.showSubmit = false;
    this.showLoading = true;
    if(this.showLoading) {
        this.editService.updateDeclaration(this.declaration).subscribe(
          declaration => {
            if(declaration) {
              this.showLoading = false;
              this.successMsg = "Déclaration mise à jour";
              this.showMessage = true;
              this.ref.reattach();
              
            } else{
              this.showLoading = false;
              this.successMsg = "La mise à jour a échouée";
              this.showMessage = true;
              this.showSubmit = true;
              this.ref.reattach();
            }
          },
          error => {
            this.showLoading = false;
            this.successMsg = "La mise à jour n'a pas pu être effectuée"
            this.showMessage = true;
            this.showSubmit = true;
            this.ref.reattach();
            }
        );
              
            
    }
    
  }


  

}
