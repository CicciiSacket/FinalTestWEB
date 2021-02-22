import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../../../BackEnd/src/Interfaces/IUser';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = "http://localhost:3005/users"
  
  constructor(private httpClient: HttpClient) { }
  
  login = (username: string, password: string) : Promise<string>=>
  this.httpClient.post<string>(this.url + "/login",{username: username, password: password}).toPromise()as Promise<string>
  
  getUser = (): Promise<IUser> => {
    let headers = new HttpHeaders()
    headers = headers.set('token',sessionStorage.getItem('token') || "")
    let username = sessionStorage.getItem('username') || ""
    return this.httpClient.get(this.url + "/"+username, {headers}).toPromise() as Promise<IUser>
  }
}
