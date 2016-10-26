import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {Entreprise, User, Role} from '../authentication.service';
import {Partenaire} from '../list-partenaire/list-partenaire.component';

const entrepriseUrl: string = "http://localhost:4567/partenaires";
const roleUrl: string = "http://localhost:4567/roles";
const addUserUrl: string = "http://localhost:4567/users";

@Injectable()
export class AddUserService {
  
  constructor(private http: Http){
  }

  getRoles():Observable<Role[]>{
    return this.http.get(roleUrl).map(this.extractData)        
            .catch(this.handleError);
  }

  postUser(user: User): Observable<User>{
    
    let body = JSON.stringify(user);
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(addUserUrl, body, options).map(this.extractData)        
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