import { Component, OnInit } from '@angular/core';
import { EventServiceService } from 'src/app/services/event-service.service';
import { UserService } from 'src/app/services/user.service';
import {IEvent} from '../../../../../BackEnd/src/Interfaces/IEvent'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  public events : IEvent[] = []
  isLogged = false
  offset = 0
  limit = 3
  pages = 0
  isVisibleNext :any
  isVisiblePrev :any
  constructor(private eventService: EventServiceService, private userService: UserService) {}
  async ngOnInit() {
    try{
      this.events = await this.eventService.all(this.offset, this.limit)
      this.isVisiblePrev = this.offset > 0 ? true : false
      this.isVisibleNext = this.events.length == this.limit ? true : false
    }catch(err){
      return err
    }
  }
  buyTicket = async (i:number) =>{
    sessionStorage.setItem("ticket", this.events[i].id)
    try{
      await this.userService.buyTicket()
      window.location.replace('http://localhost:4200/user')
    }catch(err){
      return err
    }
  }
  checkLogged = async () =>{
    try{
      this.isLogged = await sessionStorage.getItem("token") ? false : true
    }catch(err){
      return err
    }
  }
  async prev(){
    this.offset = this.offset - this.limit;
    this.ngOnInit();
  }
  next = async () => {
    this.offset = this.offset + this.limit;
    this.ngOnInit();
  }
}
