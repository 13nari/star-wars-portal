import { Component, OnInit } from '@angular/core';

import { StarshipService } from '../starship.service';
import { Starship } from '../starship';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css']
})
export class StarshipsComponent implements OnInit {

  starships: Starship[];

  constructor(private starshipService: StarshipService) { }

  ngOnInit() {
    this.getStarships();
  }

  getStarships(): void {
    this.starshipService.getStarships()
    .subscribe(heroes => this.starships = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.starshipService.addStarship({ name } as Starship)
      .subscribe(hero => {
        this.starships.push(hero);
      });
  }

  delete(starship: Starship): void {
    this.starships = this.starships.filter(h => h !== starship);
    this.starshipService.deleteStarship(starship).subscribe();
  }

}