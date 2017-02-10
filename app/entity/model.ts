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