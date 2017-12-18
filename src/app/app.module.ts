import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppRoutingModule }     from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { CharacterDetailComponent }  from './character-detail/character-detail.component';
import { CharactersComponent }      from './characters/characters.component';
import { CharacterSearchComponent }  from './character-search/character-search.component';
import { CharacterService }          from './character.service';
import { MessageService }       from './message.service';
import { MessagesComponent }    from './messages/messages.component';
import { StarshipsComponent } from './starships/starships.component';
import { StarshipService }          from './starship.service';
import { StarshipDetailComponent } from './starship-detail/starship-detail.component';
import { SpeciesComponent } from './species/species.component';
import { SpecieService }          from './specie.service';
import { PilotsComponent } from './pilots/pilots.component';
import { PilotService }          from './pilot.service';
import { PilotDetailComponent } from './pilot-detail/pilot-detail.component';
import { StarshipSearchComponent } from './starship-search/starship-search.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    CharactersComponent,
    CharacterDetailComponent,
    MessagesComponent,
    CharacterSearchComponent,
    StarshipsComponent,
    StarshipDetailComponent,
    SpeciesComponent,
    PilotsComponent,
    PilotDetailComponent,
    StarshipSearchComponent
  ],
  providers: [ CharacterService, MessageService, StarshipService, SpecieService, PilotService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
