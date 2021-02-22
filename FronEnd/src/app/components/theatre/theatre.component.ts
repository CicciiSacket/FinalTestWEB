import { Component, OnInit } from '@angular/core';
import { EventServiceService } from 'src/app/services/event-service.service';
import { UserService } from 'src/app/services/user.service';
import { IEvent } from '../../../../../BackEnd/src/Interfaces/IEvent';

@Component({
  selector: 'app-theatre',
  templateUrl: './theatre.component.html',
  styleUrls: ['./theatre.component.css']
})
export class TheatreComponent implements OnInit {
  public events : IEvent[] = []
  public id = []
  isLogged = false
  toShow = ""
  constructor(private eventService: EventServiceService, private userService: UserService) { }

  async ngOnInit() {
    try{
      this.events = await this.eventService.getTheatreEvents()
      this.checkLogged()
    }catch(error){
      return error
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
  checkLogged = () =>{
    this.isLogged = sessionStorage.getItem("token") ? true : false
  }
  show = (i:number) =>{
    this.toShow = this.events[i].id
    alert(this.toShow);
  }
  
}
