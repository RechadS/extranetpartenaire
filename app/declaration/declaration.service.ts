import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {Entreprise, Contrat, User} from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

const clientUrl = (siret: string, raison: string) => `http://localhost:4567/client?siret=${siret}&raison=${raison}`;
const declarationsUrl = (id: number) => 
          `http://localhost:4567/contrats/${id}`;
const declarationsCheckCredentialUrl = (idcontrat: number, iduser: number) => 
          `http://localhost:4567/contrats/${idcontrat}/checkcredentials/${iduser}`;

const statutUrl = `http://localhost:4567/declaration/statut`;


@Injectable()
export class DeclarationService {

	// store the URL so we can redirect
  redirectUrl: string;
  public user: User = JSON.parse(localStorage.getItem("user"));
  private sub: any;

	constructor(private http: Http, private router: Router, private route: ActivatedRoute){
  }

  checkCredentials(idcontrat: number, iduser: number): Observable<boolean>{
    return this.http.get(declarationsCheckCredentialUrl(idcontrat, iduser)).map(this.extractData)        
            .catch(this.handleError);

    
  }

  getClient(client: Entreprise): Observable<Entreprise>{
    return this.http.get(clientUrl(client.siret, client.raisonsociale)).map(this.extractData)        
            .catch(this.handleError);
  }

  getDeclaration(id: number): Observable<Contrat>{
  	return this.http.get(declarationsUrl(id)).map(this.extractData)        
            .catch(this.handleError);
  }

  putStatut(declaration: Contrat): Observable<Boolean>{
    let body = JSON.stringify(declaration);
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(statutUrl, body, options).map(this.extractData)        
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