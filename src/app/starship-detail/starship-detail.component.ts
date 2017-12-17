import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Starship }         from '../starship';
import { StarshipService }  from '../starship.service';

@Component({
  selector: 'app-starship-detail',
  templateUrl: './starship-detail.component.html',
  styleUrls: ['./starship-detail.component.css']
})
export class StarshipDetailComponent implements OnInit {

  @Input() starship: Starship;
  constructor(
    private route: ActivatedRoute,
    private starshipService: StarshipService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getStarship();
  }

  getStarship(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.starshipService.getStarship(id)
      .subscribe(starship => this.starship = starship);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.starshipService.updateStarship(this.starship)
      .subscribe(() => this.goBack());
  }

}