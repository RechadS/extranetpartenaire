import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {Entreprise, Contrat, User} from '../authentication.service';
import { ActivatedRoute } from '@angular/router';

const clientUrl = (siret: string, raison: string) => `http://localhost:4567/client?siret=${siret}&raison=${raison}`;
const declarationsUrl = (id: number) => 
          `http://localhost:4567/contrats/${id}`;

const statutUrl = `http://localhost:4567/declaration/statut`;


@Injectable()
export class DeclarationService {

	// store the URL so we can redirect
  redirectUrl: string;
  public user: User = JSON.parse(localStorage.getItem("user"));
  private sub: any;

	constructor(private http: Http, private route: ActivatedRoute){
  }

  checkCredits(){
    this.sub = this.route.params.subscribe(params => {
       this.getDeclaration(+params['id'])
          .subscribe(declaration => {
            if(this.user.role.id == 1 || this.user.role.id == 2) {
              console.log("Accès autorisé");
              return true;
            }
            if(declaration.user.id == this.user.id) {
              console.log("Accès autorisé");
              return true;
            }
            if(this.user.role.id == 3 && this.user.entreprise.id == declaration.user.entreprise.id) {
              console.log("Accès autorisé");
              return true;
            }
            console.log("Accès refusé");
            return false;
          },
          error => {
            console.log("Impossible de récupérer le contrat")
          });
    });

    
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