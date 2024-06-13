import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { VolleyballResponse } from '../interfaces/VolleyballResponse';

@Injectable({
  providedIn: 'root'
})
export class VolleyballService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api-volleyball.p.rapidapi.com';
  private apiKey = 'b3b5c942b8msh862dd8f7627df80p14bb58jsn0ee4384b46f1';
  private apiHost = 'api-volleyball.p.rapidapi.com';

  constructor() {}

  getVolleyballByDate(date: string): Observable<VolleyballResponse> {
    const url = `${this.apiUrl}/games?date=${date}`;
    return this.http.get<VolleyballResponse>(url, {
      headers: {
        'X-RapidAPI-Key': this.apiKey,
        'X-RapidAPI-Host': this.apiHost,
      },
    }).pipe(
      map(data => {
        data.response.forEach(match => {
          match.date = new Date(match.date).toString();
        });
        console.log('Volleyball data:', data);
        return data;
      }),
      catchError(error => {
        console.error('Error fetching data', error);
        return throwError(() => new Error('Error fetching data'));
      })
    );
  }

  getHeadToHead(team1Id: number, team2Id: number): Observable<any> {
    const url = `${this.apiUrl}/games/h2h?h2h=${team1Id}-${team2Id}`;
    return this.http.get<any>(url, {
      headers: {
        'X-RapidAPI-Key': this.apiKey,
        'X-RapidAPI-Host': this.apiHost,
      },
    }).pipe(
      map(data => {
        console.log('Head-to-head data:', data);
        return data;
      }),
      catchError(error => {
        console.error('Error fetching head-to-head data', error);
        return throwError(() => new Error('Error fetching head-to-head data'));
      })
    );
  }
}
