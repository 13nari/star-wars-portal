import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
//import { CharacterDetailComponent }  from './character-detail/character-detail.component';
import { CharactersComponent }      from './characters/characters.component';
//import { CharacterSearchComponent }  from './character-search/character-search.component';
import { CharacterService }          from './character.service';
import { MessageService }       from './message.service';
import { MessagesComponent }    from './messages/messages.component';
import { StarshipsComponent } from './starships/starships.component';
import { StarshipService }          from './starship.service';
import { StarshipDetailComponent } from './starship-detail/starship-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    CharactersComponent,
  //  CharacterDetailComponent,
    MessagesComponent,
  //  CharacterSearchComponent,
    StarshipsComponent,
    StarshipDetailComponent
  ],
  providers: [ CharacterService, MessageService, StarshipService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
