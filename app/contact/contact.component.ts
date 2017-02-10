import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {AuthenticationService} from '../authentication.service';
import {User} from '../entity/model';
import {ContactService} from './contact.service';
declare var classie: any;
declare var SelectFxJs: any;
declare var inputlabel: any;

@Component({
  moduleId: module.id,
  selector: 'app-contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.css']

})
export class ContactComponent  implements OnInit {

	public objet : String = "";
	public message : string;
	private user: User = JSON.parse(localStorage.getItem("user"));
	public successMsg: String;
	public showSubmit: boolean = true;
	public showLoading: boolean = false;
	public showMessage: boolean = false;


	constructor(private ref: ChangeDetectorRef, private contactService: ContactService,
	    private http: Http, private auth: AuthenticationService){
	}

	ngOnInit() {
	  	inputlabel.inputlabelcheck();
	}

	sendMail(){
		this.showSubmit = false;
	    this.showLoading = true;
	    if(this.showLoading) {
			let objet = "Nouveau message envoyé par " + this.user.entreprise.raisonsociale + " depuis l'extranet partenaire";
			let message = this.user.prenom +" " + this.user.nom + " de " + this.user.entreprise.raisonsociale + "a utilisé le formulaire de contact\n";
			message += "\nObjet: " + this.objet;
			message += "\n\nMessage: \n" + this.message;
			this.contactService.sendMail(objet, message).subscribe(
				message => {
					this.showLoading = false;
                    this.successMsg = "Votre message a été bien été transmis à notre équipe";
                    this.showMessage = true;
					
					this.ref.reattach();
				},
				error => {
					this.showLoading = false;
					this.successMsg = "Une erreur est survenue lors de l'envoi de votre message";
					this.showMessage = true;
					this.showSubmit = true;
					this.ref.reattach();
				},
			);
		}
	}

}
