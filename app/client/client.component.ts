import { Component } from '@angular/core';

export class Client {
  constructor(public id: number, public raisonsociale: string, public email: string,
    public telephone: string, public nbContrats: number, public montantContrats: number) { }
}


@Component({
  moduleId: module.id,
  selector: 'app-client',
  templateUrl: 'client.component.html',
  styleUrls: ['client.component.css']
})

export class ClientComponent {

  clients = [
    new Client(1,'Aliquet Limited', 'johndoe@example.com', '01 47 85 43 64', 3, 15200),
    new Client(2,'Eleifend Foundation', 'litora@est.com', '01 98 63 24 85', 6, 24360),
    new Client(3,'Dapibus Industries', 'malesuada@mattis.com', '03 54 85 21 63', 1, 4540),
    new Client(4,'Condimentum', 'vel.quam@dolor.net', '01 96 45 85 42', 2, 9700),
    new Client(5,'Suspendisse', 'auctor@mauris.net', '04 25 47 62 85', 1, 5200),
    new Client(6,'Volutpat', 'quis@ultricessitamet.net', '01 94 85 46 37', 3, 1600)
  ];



}
