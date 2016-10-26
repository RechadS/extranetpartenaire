import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {Entreprise, Contrat, User} from '../authentication.service';
import {Partenaire} from '../list-partenaire/list-partenaire.component';

const partenaireUrl = (identreprise: number) => 
          `http://localhost:4567/partenaire/${identreprise}`;

const partenaireContratsUrl = (identreprise: number) => 
          `http://localhost:4567/partenaire/${identreprise}/contrats`;


@Injectable()
export class PartenaireService {

	
	constructor(private http: Http){
  }

  getListContrats(idEntreprise: number): Observable<Contrat[]>{
  	return this.http.get(partenaireContratsUrl(idEntreprise)).map(this.extractData)        
            .catch(this.handleError);
  }

  getPartenaire(idEntreprise: number): Observable<Partenaire>{
    return this.http.get(partenaireUrl(idEntreprise)).map(this.extractData)        
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