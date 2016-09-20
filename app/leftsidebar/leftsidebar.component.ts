import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';

@Component({
  moduleId: module.id,
  selector: 'leftsidebar',
  templateUrl: 'leftsidebar.component.html',
  styleUrls: ['leftsidebar.component.css']
})

export class LeftsidebarComponent implements OnInit {

  constructor(private _service:AuthenticationService) {}

  ngOnInit() {
  }

  logout() {
    this._service.logout();
  }
}
