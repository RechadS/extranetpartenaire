import {Injectable} from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {Md5} from 'ts-md5/dist/md5';
import {User, Entreprise} from './entity/model';

const loginUrl = (email: string, password: string) => `http://localhost:4567/login?email=${email}&password=${password}`;
const entrepriseUrl = (id: number) => `http://localhost:4567/entreprise?id=${id}`;

@Injectable()
export class AuthenticationService {
 
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  usercomplete: Observable<String[]>;

  constructor(private router: Router, private route: ActivatedRoute, private http: Http){
  }
   
  logout() {
    localStorage.removeItem("user");
  }
 
  login(user: User): Observable<User>{
    
    var pwd = Md5.hashStr(user.password);
    var password = String(pwd);

    return this.http.get(loginUrl(user.email, password)).map(this.extractData)        
            .catch(this.handleError);
 
  }
    
  getEntreprise(user: User): Observable<Entreprise>{
    return this.http.get(entrepriseUrl(user.entreprise.id)).map(this.extractData)        
            .catch(this.handleError);
  }

  public extractData(res: Response) {
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