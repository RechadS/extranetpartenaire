import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {Entreprise, Contrat, User} from '../authentication.service';
import {Client} from './list-client.component';

const clientsUrl = (userid: number, role:number) => `http://localhost:4567/clients?userid=${userid}&role=${role}`;


@Injectable()
export class ListClientService {

	
	constructor(private http: Http){
  }

  getListClients(user: User): Observable<Client[]>{
  	return this.http.get(clientsUrl(user.id, user.role.id)).map(this.extractData)        
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