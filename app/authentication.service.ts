import {Injectable} from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
 
export class User {
  constructor(public email: string,
    public password: string) { }
}
 
var users = [
  new User('admin@admin.com','adm9'),
  new User('user1@gmail.com','a23')
];
 
@Injectable()
export class AuthenticationService {
 
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  private router: Router;
  constructor(private _router: Router, private route: ActivatedRoute){
    this.router = _router;
    this.route = route;
  }
   
  logout() {
    localStorage.removeItem("user");
    this.router.navigate(['login']);
  }
 
  login(user: User){
    var authenticatedUser = users.find(u => u.email === user.email);
    if (authenticatedUser){

      localStorage.setItem("user", JSON.stringify(authenticatedUser));
      
      this.isLoggedIn = true;
      

      this.router.navigate(['/private', 'home'], {relativeTo: this.route});
      
      return true;
    }
    return false;
 
  }
 
   
   
}