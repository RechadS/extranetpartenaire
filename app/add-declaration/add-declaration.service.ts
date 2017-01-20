import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {Entreprise, Contrat, User, Logiciel, LogicielCategorie} from '../authentication.service';

const clientUrl = (siret: string, raison: string) => `http://localhost:4567/client?siret=${siret}&raison=${raison}`;
const entrepriseUrl = (id: number) => `http://localhost:4567/entreprise?id=${id}`;
const partenaireUsersUrl = (identreprise: number) => 
          `http://localhost:4567/partenaire/${identreprise}/users`;
const logicielUrl = `http://localhost:4567/logiciels`;
const responsablesUrl = `http://localhost:4567/partenaires/responsables`;

@Injectable()
export class AddDeclarationService {

	constructor(private http: Http){
  }

  getClient(client: Entreprise): Observable<Entreprise>{
    return this.http.get(clientUrl(client.siret, client.raisonsociale)).map(this.extractData)        
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

  postDeclaration(declaration: Contrat): Observable<Contrat>{
  	let addDeclarationUrl: string = "http://localhost:4567/declaration";
  	let body = JSON.stringify(declaration);
  	
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

  	return this.http.post(addDeclarationUrl, body, options).map(this.extractData)        
            .catch(this.handleError);
  }

  sendMail(objet: String, message: String): Observable<Boolean>{
    let sendMailUrl: string = "http://localhost:4567/mail";
    let mail = {"objet" : objet, "message" : message};
    let body = JSON.stringify(mail);
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(body);
    return this.http.post(sendMailUrl, body, options).map(this.extractData)        
            .catch(this.handleError);
  }

  checkDeclaration(declaration: Contrat): Observable<Boolean>{
  	let addDeclarationUrl: string = "http://localhost:4567/declaration/check";
  	let body = JSON.stringify(declaration);
  	
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

  	return this.http.post(addDeclarationUrl, body, options).map(this.extractData)        
            .catch(this.handleError);
  }

  getListLogiciel(): Observable<Logiciel[]>{
  	return this.http.get(logicielUrl).map(this.extractData)        
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