import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Pilot } from './pilot';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PilotService {

  private pilotsUrl = 'api/pilots';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET pilots from the server */
  getPilots (): Observable<Pilot[]> {
    return this.http.get<Pilot[]>(this.pilotsUrl)
      .pipe(
        tap(pilots => this.log(`fetched pilots`)),
        catchError(this.handleError('getPilots', []))
      );
  }

  /** GET pilot by id. Return `undefined` when id not found */
  getPilotNo404<Data>(id: number): Observable<Pilot> {
    const url = `${this.pilotsUrl}/?id=${id}`;
    return this.http.get<Pilot[]>(url)
      .pipe(
        map(pilots => pilots[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} pilot id=${id}`);
        }),
        catchError(this.handleError<Pilot>(`getPilot id=${id}`))
      );
  }

  /** GET pilot by id. Will 404 if id not found */
  getPilot(id: number): Observable<Pilot> {
    const url = `${this.pilotsUrl}/${id}`;
    return this.http.get<Pilot>(url).pipe(
      tap(_ => this.log(`fetched pilot id=${id}`)),
      catchError(this.handleError<Pilot>(`getPilot id=${id}`))
    );
  }

  /* GET pilots whose name contains search term */
  searchPilots(term: string): Observable<Pilot[]> {
    if (!term.trim()) {
      // if not search term, return empty pilot array.
      return of([]);
    }
    return this.http.get<Pilot[]>(`api/pilots/?name=${term}`).pipe(
      tap(_ => this.log(`found pilots matching "${term}"`)),
      catchError(this.handleError<Pilot[]>('searchPilots', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new pilot to the server */
  addPilot (pilot: Pilot): Observable<Pilot> {
    return this.http.post<Pilot>(this.pilotsUrl, pilot, httpOptions).pipe(
      tap((pilot: Pilot) => this.log(`added pilot w/ id=${pilot.id}`)),
      catchError(this.handleError<Pilot>('addPilot'))
    );
  }

  /** DELETE: delete the pilot from the server */
  deletePilot (pilot: Pilot | number): Observable<Pilot> {
    const id = typeof pilot === 'number' ? pilot : pilot.id;
    const url = `${this.pilotsUrl}/${id}`;

    return this.http.delete<Pilot>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted pilot id=${id}`)),
      catchError(this.handleError<Pilot>('deletePilot'))
    );
  }

  /** PUT: update the pilot on the server */
  updatePilot (pilot: Pilot): Observable<any> {
    return this.http.put(this.pilotsUrl, pilot, httpOptions).pipe(
      tap(_ => this.log(`updated pilot id=${pilot.id}`)),
      catchError(this.handleError<any>('updatePilot'))
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

  /** Log a PilotService message with the MessageService */
  private log(message: string) {
    this.messageService.add('PilotService: ' + message);
  }
}
