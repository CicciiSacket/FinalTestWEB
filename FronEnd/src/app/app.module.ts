import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EventComponent } from './components/event/event.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { MusicComponent } from './components/music/music.component';
import { SportComponent } from './components/sport/sport.component';
import { TheatreComponent } from './components/theatre/theatre.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { SignupComponent } from './components/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { CurrencyPipe } from './pipes/currency.pipe';
import { HidePasswordPipe } from './pipes/hide-password.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EventComponent,
    HomeComponent,
    MusicComponent,
    SportComponent,
    TheatreComponent,
    LoginComponent,
    UserComponent,
    SignupComponent,
    HeaderComponent,
    CurrencyPipe,
    HidePasswordPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
