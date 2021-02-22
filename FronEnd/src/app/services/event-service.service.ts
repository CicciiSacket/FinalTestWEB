import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { IEvent } from '../../../../BackEnd/src/Interfaces/IEvent';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {
  public url = "http://localhost:3005/events"

  constructor(private httpClient: HttpClient) {}

  all = (offset: number, limit: number): Promise<IEvent[]> => this.httpClient.get(`${this.url}?offset=${offset}&limit=${limit}`).toPromise() as Promise<IEvent[]>
  getMusicEvents = (): Promise<IEvent[]> => this.httpClient.get(this.url + "/music").toPromise() as Promise<IEvent[]>
  getSportEvents = (): Promise<IEvent[]> => this.httpClient.get(this.url + "/sport").toPromise() as Promise<IEvent[]>
  getTheatreEvents = (): Promise<IEvent[]> => this.httpClient.get(this.url + "/theatre").toPromise() as Promise<IEvent[]>
  newEvent = (name: string, type: string, place:string , dateTime: string, price: number): Promise<IEvent> =>{
    let headers = new HttpHeaders()
    headers = headers.set('token',sessionStorage.getItem('token') || "")
    return this.httpClient.post(this.url, {name, type, place, dateTime, price}, {headers}).toPromise() as Promise<IEvent>
  }
  deleteEvent = (eventId: string): Promise<any> =>{
    let headers = new HttpHeaders()
    headers = headers.set('token',sessionStorage.getItem('token') || "")
    return this.httpClient.delete(`${this.url}/${eventId}`, {headers}).toPromise() as Promise<any>
  }
}
