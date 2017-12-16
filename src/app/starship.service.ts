import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Starship } from './starship';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class StarshipService {

  private starshipsUrl = 'api/starships';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getStarships (): Observable<Starship[]> {
    return this.http.get<Starship[]>(this.starshipsUrl)
      .pipe(
        tap(starships => this.log(`fetched starships`)),
        catchError(this.handleError('getStarships', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getStarshipNo404<Data>(id: number): Observable<Starship> {
    const url = `${this.starshipsUrl}/?id=${id}`;
    return this.http.get<Starship[]>(url)
      .pipe(
        map(starships => starships[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} starship id=${id}`);
        }),
        catchError(this.handleError<Starship>(`getStarship id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getStarship(id: number): Observable<Starship> {
    const url = `${this.starshipsUrl}/${id}`;
    return this.http.get<Starship>(url).pipe(
      tap(_ => this.log(`fetched starship id=${id}`)),
      catchError(this.handleError<Starship>(`getStarship id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchStarships(term: string): Observable<Starship[]> {
    if (!term.trim()) {
      // if not search term, return empty starship array.
      return of([]);
    }
    return this.http.get<Starship[]>(`api/starships/?name=${term}`).pipe(
      tap(_ => this.log(`found starships matching "${term}"`)),
      catchError(this.handleError<Starship[]>('searchStarships', []))
    );
  }

  //////// Save methods ////////// ############# APAGAR ###########

  /** POST: add a new hero to the server */
  addStarship (starship: Starship): Observable<Starship> {
    return this.http.post<Starship>(this.starshipsUrl, starship, httpOptions).pipe(
      tap((starship: Starship) => this.log(`added starship w/ id=${starship.id}`)),
      catchError(this.handleError<Starship>('addStarship'))
    );
  }

  /** DELETE: delete the starship from the server */
  deleteStarship (starship: Starship | number): Observable<Starship> {
    const id = typeof starship === 'number' ? starship : starship.id;
    const url = `${this.starshipsUrl}/${id}`;

    return this.http.delete<Starship>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted starship id=${id}`)),
      catchError(this.handleError<Starship>('deleteStarship'))
    );
  }

  /** PUT: update the hero on the server */
  updateStarship (starship: Starship): Observable<any> {
    return this.http.put(this.starshipsUrl, starship, httpOptions).pipe(
      tap(_ => this.log(`updated starship id=${starship.id}`)),
      catchError(this.handleError<any>('updateStarship'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('StarshipService: ' + message);
  }

}