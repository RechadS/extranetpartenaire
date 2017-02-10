import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {AuthenticationService} from '../../authentication.service';
import {AddPartenaireService} from './add-partenaire.service';
import {Partenaire} from '../list-partenaire/list-partenaire.component';
declare var classie: any;
declare var SelectFxJs: any;
declare var inputlabel: any;


@Component({
  moduleId: module.id,
  selector: 'add-partenaire',
  templateUrl: 'add-partenaire.component.html',
  styleUrls: ['add-partenaire.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddPartenaireComponent implements OnInit {
  
  public partenaire: Partenaire = new Partenaire(null, "", "", "", "", "", null, null, 0);
  public submitMsg: string;
  
  public successMsg: string;

  public showSubmit: boolean =true;
  public showLoading: boolean =false;
  public showMessage: boolean =false;

  constructor(private ref: ChangeDetectorRef, private addService: AddPartenaireService, private http: Http, private auth: AuthenticationService){
  
  }
  ngOnInit() {

  	inputlabel.inputlabelcheck();
    
  }


  
  addPartenaire(){
    this.showSubmit = false;
    this.showLoading = true;
    if(this.showLoading) {
      
        this.addService.postPartenaire(this.partenaire).subscribe(
          partenaire => {
            if(partenaire) {
              
              this.showLoading = false;
              this.successMsg = "Partenaire ajouté";
              this.showMessage = true;
              this.ref.reattach();
            } else{
              this.showLoading = false;
              this.successMsg = "L'ajout a échoué";
              this.showMessage = true;
              this.showSubmit = true;
              this.ref.reattach();
            }
          },
          error => {
            this.showLoading = false;
            this.successMsg = "L'ajout a échoué"
            this.showMessage = true;
            this.showSubmit = true;
            this.ref.reattach();
            }
        );
                                
    }
    
  }


  showHide(submit: boolean, loading: boolean, message: boolean){
    this.showSubmit = submit;
    this.showLoading = loading;
    this.showMessage = message;
  }

}
