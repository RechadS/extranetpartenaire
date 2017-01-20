import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {Entreprise, Contrat, User, CommandeLogiciel} from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

const clientUrl = (siret: string, raison: string) => `http://localhost:4567/clients?siret=${siret}&raison=${raison}`;
const declarationsUrl = (id: number) => `http://localhost:4567/contrats/${id}`;
const updateDeclarationsUrl = `http://localhost:4567/declaration`;
const updateDeclarationsMontantUrl = `http://localhost:4567/declaration/montant`;
const postCommandeLogicielUrl = `http://localhost:4567/commandelogiciel`;
const commandeLogicielUrl = (id: number) => `http://localhost:4567/commandelogiciel/${id}`;
const responsablesUrl = `http://localhost:4567/partenaires/responsables`;
const partenaireUsersUrl = (identreprise: number) => 
          `http://localhost:4567/partenaire/${identreprise}/users`; 


@Injectable()
export class DeclarationEditService {

	// store the URL so we can redirect
  redirectUrl: string;
  private sub: any;

	constructor(private http: Http, private router: Router, private route: ActivatedRoute){
  }

  updateDeclaration(declaration: Contrat): Observable<Contrat>{
    let body = JSON.stringify(declaration);
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.put(updateDeclarationsUrl, body, options).map(this.extractData)        
            .catch(this.handleError);
  }

  updateDeclarationMontant(declaration: Contrat): Observable<Contrat>{
    let body = JSON.stringify(declaration);
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    return this.http.put(updateDeclarationsMontantUrl, body, options).map(this.extractData)        
            .catch(this.handleError);
  }

  deleteCommandeLogiciel(commande: CommandeLogiciel): Observable<CommandeLogiciel>{
    return this.http.delete(commandeLogicielUrl(commande.id)).map(this.extractData)        
            .catch(this.handleError);
  }

  postCommandeLogiciel(commandeLogiciel: CommandeLogiciel): Observable<CommandeLogiciel>{
    let body = JSON.stringify(commandeLogiciel);
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(postCommandeLogicielUrl, body, options).map(this.extractData)        
            .catch(this.handleError);
  }

  getListResponsable(): Observable<User[]>{
    return this.http.get(responsablesUrl).map(this.extractData)        
            .catch(this.handleError);
  }

  getListUser(user: User): Observable<User[]>{
    return this.http.get(partenaireUsersUrl(user.entreprise.id)).map(this.extractData)        
            .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;  //.data || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}