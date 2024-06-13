import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FootbalResponse, Match } from '../interfaces/FootballResponse';

@Injectable({
  providedIn: 'root'
})
export class FootbalService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api-football-v1.p.rapidapi.com/v3';
  private apiKey = '3fd970ac79msha17453de4f1dd90p18076ejsn5108254ddc26';
  private apiHost = 'api-football-v1.p.rapidapi.com';

  constructor() { }

  getFootbalByDate(date: string): Observable<FootbalResponse | undefined> {
    const url = `${this.apiUrl}/fixtures?date=${date}`;
    return this.http.get<FootbalResponse>(url, {
      headers: {
        'X-RapidAPI-Key': this.apiKey,
        'X-RapidAPI-Host': this.apiHost,
      },
    }).pipe(
      map(data => {
        if (data && data.response) {
          data.response.forEach(match => {
            match.fixture.date = new Date(match.fixture.date).toString();
          });
          return data;
        } else {
          return undefined;
        }
      }),
      catchError(error => {
        console.error('Error fetching data', error);
        return throwError(() => new Error('Error fetching data'));
      })
    );
  }

  getFixtureStatistics(fixtureId: number): Observable<any> {
    const url = `${this.apiUrl}/fixtures/statistics?fixture=${fixtureId}`;
    return this.http.get<any>(url, {
      headers: {
        'X-RapidAPI-Key': this.apiKey,
        'X-RapidAPI-Host': this.apiHost,
      },
    }).pipe(
      catchError(error => {
        console.error('Error fetching fixture statistics', error);
        return throwError(() => new Error('Error fetching fixture statistics'));
      })
    );
  }

  getFixtureEvents(fixtureId: number): Observable<any> {
    const url = `${this.apiUrl}/fixtures/events?fixture=${fixtureId}`;
    return this.http.get<any>(url, {
      headers: {
        'X-RapidAPI-Key': this.apiKey,
        'X-RapidAPI-Host': this.apiHost,
      },
    }).pipe(
      catchError(error => {
        console.error('Error fetching fixture events', error);
        return throwError(() => new Error('Error fetching fixture events'));
      })
    );
  }

  getLineups(fixtureId: number): Observable<any> {
    const url = `${this.apiUrl}/fixtures/lineups?fixture=${fixtureId}`;
    return this.http.get<any>(url, {
      headers: {
        'X-RapidAPI-Key': this.apiKey,
        'X-RapidAPI-Host': this.apiHost,
      },
    }).pipe(
      catchError(error => {
        console.error('Error fetching lineups', error);
        return throwError(() => new Error('Error fetching lineups'));
      })
    );
  }
}
