import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HockeyResponse } from '../interfaces/HockeyResponse';

@Injectable({
  providedIn: 'root'
})
export class HockeyService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api-hockey.p.rapidapi.com';
  private apiKey = 'b3b5c942b8msh862dd8f7627df80p14bb58jsn0ee4384b46f1'; // Reemplaza con tu clave de API
  private apiHost = 'api-hockey.p.rapidapi.com';

  constructor() {}

  getHockeyByDate(date: string): Observable<HockeyResponse> {
    const url = `${this.apiUrl}/games?date=${date}`;
    return this.http.get<HockeyResponse>(url, {
      headers: new HttpHeaders({
        'X-RapidAPI-Key': this.apiKey,
        'X-RapidAPI-Host': this.apiHost,
      }),
    }).pipe(
      map(data => {
        data.response.forEach(match => {
          match.date = new Date(match.date).toString();
        });
        return data;
      }),
      catchError(error => {
        return throwError(() => new Error('Error fetching data'));
      })
    );
  }

  getHeadToHead(team1Id: number, team2Id: number): Observable<any> {
    const url = `${this.apiUrl}/games/h2h/?h2h=${team1Id}-${team2Id}`;
    return this.http.get<any>(url, {
      headers: new HttpHeaders({
        'X-RapidAPI-Key': this.apiKey,
        'X-RapidAPI-Host': this.apiHost,
      }),
    }).pipe(
      map(data => {
        return data;
      }),
      catchError(error => {
        return throwError(() => new Error('Error fetching head-to-head data'));
      })
    );
  }
}
