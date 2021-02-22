import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public currentType = ""
  types = [
    {
      name: "music",
      img: "https://dotravel.com/uploads/articles/96/live-music-barcelona-feature.jpg",
      description: "See all music events",
      link: "http://localhost:4200/events/music"
    },
    {
      name: "theatre",
      img: "https://www.romatoday.it/~media/horizontal-hi/28653256639913/gigi-proietti-globe-theatre-2-2.jpg",
      description: "See all theatre shows",
      link: "http://localhost:4200/events/theatre"
    },
    {
      name: "sport",
      img: "https://montagneepaesi.com/wp-content/uploads/2020/05/sport-1024x683.jpg",
      description: "See all sport events",
      link: "http://localhost:4200/events/sport"
    }
  ]
  constructor() { }
  setCurrentType =() =>{
    localStorage.setItem('type',this.currentType)
  }
  ngOnInit(): void {
  }

}
