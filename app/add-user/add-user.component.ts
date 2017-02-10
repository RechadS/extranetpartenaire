import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {AuthenticationService} from '../authentication.service';
import { User, Role, Entreprise } from '../entity/model';
import {AddUserService} from './add-user.service';
import {Partenaire} from '../partenaire/list-partenaire/list-partenaire.component';
declare var classie: any;
declare var SelectFxJs: any;
declare var inputlabel: any;


@Component({
  moduleId: module.id,
  selector: 'add-user',
  templateUrl: 'add-user.component.html',
  styleUrls: ['add-user.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddUserComponent implements OnInit {
  
  public entreprise: Entreprise = new Entreprise(null, "", "", "", "", "", null);
  public user: User = new User(null, "", "", "", "", null, this.entreprise, null);
  public roles: Role[];
  public checkpassword : string;
  public submitMsg: string;

  
  public successMsg: string;
  private sub : any;
  public showSubmit: boolean =true;
  public showLoading: boolean =false;
  public showMessage: boolean =false;

  constructor(private ref: ChangeDetectorRef, private addService: AddUserService, private route: ActivatedRoute, private http: Http, private auth: AuthenticationService){
    this.sub = this.route.params.subscribe(params => {

    this.user.entreprise.id = +params['id'];
    this.addService.getRoles().subscribe(
      roles =>{
          this.roles = roles;
      },
      error =>{
          this.submitMsg = "Impossible de charger les rôles";
      });
    });
    
  }
  ngOnInit() {

  	inputlabel.inputlabelcheck();
    
  }


  
  addUser(){
    this.showSubmit = false;
    this.showLoading = true;
    if(this.showLoading && this.user.password == this.checkpassword) {
         
        this.addService.postUser(this.user).subscribe(
          user => {
            if(user) {
              
              this.showLoading = false;
              this.successMsg = "Utilisateur ajouté";
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
            this.successMsg = "L'ajout a échoué";
            this.showMessage = true;
            this.showSubmit = true;
            this.ref.reattach();
            }
        );
                                
    } else{
      this.showLoading = false;
      this.showSubmit = true;
      this.successMsg = "Les mots de passe saisis ne correspondent pas";
      this.showMessage = true;
      this.ref.reattach();
    }
    
  }


  showHide(submit: boolean, loading: boolean, message: boolean){
    this.showSubmit = submit;
    this.showLoading = loading;
    this.showMessage = message;
  }

}
