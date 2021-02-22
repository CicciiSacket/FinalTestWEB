import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './components/event/event.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MusicComponent } from './components/music/music.component';
import { SignupComponent } from './components/signup/signup.component';
import { SportComponent } from './components/sport/sport.component';
import { TheatreComponent } from './components/theatre/theatre.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: "user", component: UserComponent
  },
  {
    path: "events", component: EventComponent,
    children :[
      {path: 'music', component: MusicComponent},
      {path: 'theatre', component: TheatreComponent},
      {path: 'sport', component: SportComponent}
    ]
  },
  {
    path:"login", component: LoginComponent
  },
  {
    path:"signup", component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
