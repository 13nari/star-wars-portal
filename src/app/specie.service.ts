import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Specie } from './specie';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SpecieService {

  private speciesUrl = 'api/species';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET species from the server */
  getSpecies (): Observable<Specie[]> {
    return this.http.get<Specie[]>(this.speciesUrl)
      .pipe(
        tap(species => this.log(`fetched species`)),
        catchError(this.handleError('getSpecies', []))
      );
  }

  /** GET specie by id. Return `undefined` when id not found */
  getSpecieNo404<Data>(id: number): Observable<Specie> {
    const url = `${this.speciesUrl}/?id=${id}`;
    return this.http.get<Specie[]>(url)
      .pipe(
        map(species => species[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} specie id=${id}`);
        }),
        catchError(this.handleError<Specie>(`getSpecie id=${id}`))
      );
  }

  /** GET specie by id. Will 404 if id not found */
  getSpecie(id: number): Observable<Specie> {
    const url = `${this.speciesUrl}/${id}`;
    return this.http.get<Specie>(url).pipe(
      tap(_ => this.log(`fetched specie id=${id}`)),
      catchError(this.handleError<Specie>(`getSpecie id=${id}`))
    );
  }

  /* GET species whose name contains search term */
  searchSpecies(term: string): Observable<Specie[]> {
    if (!term.trim()) {
      // if not search term, return empty specie array.
      return of([]);
    }
    return this.http.get<Specie[]>(`api/species/?name=${term}`).pipe(
      tap(_ => this.log(`found species matching "${term}"`)),
      catchError(this.handleError<Specie[]>('searchSpecies', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new specie to the server */
  addSpecie (specie: Specie): Observable<Specie> {
    return this.http.post<Specie>(this.speciesUrl, specie, httpOptions).pipe(
      tap((specie: Specie) => this.log(`added specie w/ id=${specie.id}`)),
      catchError(this.handleError<Specie>('addSpecie'))
    );
  }

  /** DELETE: delete the specie from the server */
  deleteSpecie (specie: Specie | number): Observable<Specie> {
    const id = typeof specie === 'number' ? specie : specie.id;
    const url = `${this.speciesUrl}/${id}`;

    return this.http.delete<Specie>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted specie id=${id}`)),
      catchError(this.handleError<Specie>('deleteSpecie'))
    );
  }

  /** PUT: update the specie on the server */
  updateSpecie (specie: Specie): Observable<any> {
    return this.http.put(this.speciesUrl, specie, httpOptions).pipe(
      tap(_ => this.log(`updated specie id=${specie.id}`)),
      catchError(this.handleError<any>('updateSpecie'))
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

  /** Log a SpecieService message with the MessageService */
  private log(message: string) {
    this.messageService.add('SpecieService: ' + message);
  }
}
