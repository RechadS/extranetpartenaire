import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {User} from '../entity/model';

@Component({
  moduleId: module.id,
  selector: 'leftsidebar',
  templateUrl: 'leftsidebar.component.html',
  styleUrls: ['leftsidebar.component.css']
})

export class LeftsidebarComponent implements OnInit {
  public isAdmin: boolean = false;
  public user: User = JSON.parse(localStorage.getItem("user"));

  constructor(private _service:AuthenticationService) {}

  ngOnInit() {
    if(this.user.role.id == 1 || this.user.role.id == 2) {
      this.isAdmin = true;
    }
  }

  logout() {
    this._service.logout();
  }
}
