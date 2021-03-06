import {Injectable} from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {Md5} from 'ts-md5/dist/md5';

export class User {
  constructor(public id: number, public nom: string, public prenom: string, public email: string,
    public password: string, public role: Role, public entreprise: Entreprise, public contrats: Contrat[]) { }
}

export class Role {
  constructor(public id: number, public libelle: string) { }
}

export class Entreprise {
  constructor(public id: number, public raisonsociale: string, public siret: string, public email: String, public telephone: String,
    public role: string, public users: User[]) { }
}

export class Contrat {
  constructor(public id: number, public datedebut: Date, public datefin: Date, public origine: User, public contact :string,
    public datecontact: Date, public datesignature: Date, public montant: number, public statut: String,
    public user: User, public client: Entreprise, public contratFiles: ContratFile[], public commandeLogiciels: CommandeLogiciel[] ) { }
}

export class ContratFile {
  constructor(public id: number, public titre: String, public chemin: String, public contrat: Contrat) { }
}

export class Logiciel {
  constructor(public id: number, public titre: String, public prix: number, public prixacces: number, public prixentree: number, 
    public duree: number, public categorie: LogicielCategorie) {
  }
}

export class LogicielCategorie  {
  
  constructor(public id: number, public libelle: String, public options: LogicielOptions[]) {
    // code...
  }
}

export class LogicielOptions {
  
  constructor(public id: number, public libelle: String, public categorie: LogicielCategorie) {
    // code...
  }
}

export class CommandeLogiciel {
  
  constructor(public id: number, public nbacces: number, public prix: number, public contrat: Contrat, 
    public logiciel: Logiciel, public options: CommandeOption[]) {
    // code...
  }
}

export class CommandeOption {
  
  constructor(public id: number, public commandeid: number, public optionid: number) {
    // code...
  }
}

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