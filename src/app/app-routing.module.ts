import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { CharactersComponent }      from './characters/characters.component';
//import { CharacterDetailComponent }  from './character-detail/character-detail.component';
import { StarshipsComponent }   from './starships/starships.component';
import { StarshipDetailComponent }  from './starship-detail/starship-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
//  { path: 'characterdetail/:id', component: CharacterDetailComponent },
  { path: 'starships', component: StarshipsComponent },
  { path: 'starshipdetail/:id', component: StarshipDetailComponent },
  { path: 'characters', component: CharactersComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
