import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RugbyResponse } from '../interfaces/RugbyResponse';

@Injectable({
  providedIn: 'root'
})
export class RugbyService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api-rugby.p.rapidapi.com';
  private apiKey = 'b3b5c942b8msh862dd8f7627df80p14bb58jsn0ee4384b46f1';
  private apiHost = 'api-rugby.p.rapidapi.com';

  constructor() {}

  getRugbyByDate(date: string): Observable<RugbyResponse> {
    const url = `${this.apiUrl}/games?date=${date}`;
    console.log(`Fetching matches for date: ${date}`);
    return this.http.get<RugbyResponse>(url, {
      headers: {
        'X-RapidAPI-Key': this.apiKey,
        'X-RapidAPI-Host': this.apiHost,
      },
    }).pipe(
      map(data => {
        console.log('Rugby data received:', data);
        data.response.forEach(match => {
          match.date = new Date(match.date).toString();
        });
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
    console.log(`Fetching head-to-head for teams: ${team1Id} vs ${team2Id}`);
    return this.http.get<any>(url, {
      headers: new HttpHeaders({
        'X-RapidAPI-Key': this.apiKey,
        'X-RapidAPI-Host': this.apiHost,
      }),
    }).pipe(
      map(data => {
        console.log('Head-to-head data received:', data);
        return data;
      }),
      catchError(error => {
        console.error('Error fetching head-to-head data', error);
        return throwError(() => new Error('Error fetching head-to-head data'));
      })
    );
  }
}
