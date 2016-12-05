import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {Entreprise, Contrat, User} from '../authentication.service';
import {Client} from '../list-client/list-client.component';

const clientUrl = (identreprise: number) => 
          `http://localhost:4567/clients/${identreprise}`;

const clientContratsUrl = (identreprise: number, userid:number, role: number) => 
          `http://localhost:4567/clients/${identreprise}/contrats?userid=${userid}&role=${role}`;

const clientCheckCredentialUrl = (idclient: number, iduser: number) => 
          `http://localhost:4567/clients/${idclient}/checkcredentials/${iduser}`;

@Injectable()
export class ClientService {

  // store the URL so we can redirect
  redirectUrl: string;
  private sub: any;
	
	constructor(private http: Http){
  }

  checkCredentials(idclient: number, iduser: number): Observable<boolean>{
    return this.http.get(clientCheckCredentialUrl(idclient, iduser)).map(this.extractData)        
            .catch(this.handleError);
  }

  getListContrats(idEntreprise: number, user: User): Observable<Contrat[]>{
  	return this.http.get(clientContratsUrl(idEntreprise, user.id, user.role.id)).map(this.extractData)        
            .catch(this.handleError);
  }

  getClient(idEntreprise: number): Observable<Client>{
    return this.http.get(clientUrl(idEntreprise)).map(this.extractData)        
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