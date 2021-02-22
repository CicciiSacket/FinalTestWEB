import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLogged = false

  constructor() { }

  ngOnInit(): void {
    this.checkLogged()
  }
  logout(): void{
    sessionStorage.clear()
    window.location.replace("http://localhost:4200")
  }
  checkLogged = () =>{
    this.isLogged = sessionStorage.getItem("token") ? true : false
  }
}
