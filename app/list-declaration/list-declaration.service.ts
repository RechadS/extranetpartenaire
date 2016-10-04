import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {Entreprise, Contrat, User} from '../authentication.service';

const clientUrl = (siret: string, raison: string) => `http://localhost:4567/client?siret=${siret}&raison=${raison}`;
const declarationsUrl = (id: number, identreprise: number, role: number) => 
          `http://localhost:4567/declarations?userid=${id}&identreprise=${identreprise}&role=${role}`;


@Injectable()
export class ListDeclarationService {

	
	constructor(private http: Http){
  }

  getClient(client: Entreprise): Observable<Entreprise>{
    return this.http.get(clientUrl(client.siret, client.raisonsociale)).map(this.extractData)        
            .catch(this.handleError);
  }

  getListDeclarations(user: User): Observable<Contrat[]>{
  	return this.http.get(declarationsUrl(user.id, user.entreprise.id, user.role.id)).map(this.extractData)        
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