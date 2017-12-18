import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Starship } from '../starship';
import { StarshipService } from '../starship.service';

@Component({
  selector: 'app-starship-search',
  templateUrl: './starship-search.component.html',
  styleUrls: ['./starship-search.component.css']
})
export class StarshipSearchComponent implements OnInit {
  
  starships$: Observable<Starship[]>;
  private searchTerms = new Subject<string>();

  constructor(private starshipService: StarshipService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.starships$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.starshipService.searchStarships(term)),
    );
  }
  
}
