import { Component, OnInit } from '@angular/core';

declare var classie: any;
declare var SelectFxJs: any;
declare var inputlabel: any;


export class Declaration {
  constructor(public raisonsociale: string, public siret: string, public nomcontact: string, 
  	public origine: string, public dateContact: string, public dateSignature: string) { }
}

@Component({
  moduleId: module.id,
  selector: 'add-declaration',
  templateUrl: 'add-declaration.component.html',
  styleUrls: ['add-declaration.component.css']
})
export class AddDeclarationComponent implements OnInit {

	public declaration = new Declaration('', '', '', '', '', '');

  

  ngOnInit() {
  	inputlabel.inputlabelcheck();
    
  }

}
