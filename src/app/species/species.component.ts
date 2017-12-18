import { Component, OnInit } from '@angular/core';

import { Specie } from '../specie';
import { SpecieService } from '../specie.service';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit {

species: Specie[];

  constructor(private specieService: SpecieService) { }

  ngOnInit() {
    this.getSpecies();
  }

  getSpecies(): void {
    this.specieService.getSpecies()
    .subscribe(species => this.species = species);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.specieService.addSpecie({ name } as Specie)
      .subscribe(specie => {
        this.species.push(specie);
      });
  }

  delete(specie: Specie): void {
    this.species = this.species.filter(h => h !== specie);
    this.specieService.deleteSpecie(specie).subscribe();
  }

}
