import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public name = ""
  public username = ""
  public password = ""
  public errorMessage = ""
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  signup = async () => {
    try{
      await this.userService.signup(this.name, this.username, this.password)
      window.location.replace("http://localhost:4200/login")
    }catch(error: any){
      this.errorMessage="password must be 6 char long, username must be unique"
      return
    }
  }

}
