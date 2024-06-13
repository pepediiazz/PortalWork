import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FootbalResponse } from '../interfaces/FootballResponse';

@Injectable({
  providedIn: 'root'
})
export class FootballFeatureService {
  private apiUrl = 'https://api-football-v1.p.rapidapi.com/v3';
  private apiKey = '3fd970ac79msha17453de4f1dd90p18076ejsn5108254ddc26';
  private apiHost = 'api-football-v1.p.rapidapi.com';

  constructor(private http: HttpClient) {}

  getNextFixtures(fixturesCount: number): Observable<FootbalResponse> {
    const url = `${this.apiUrl}/fixtures?next=${fixturesCount}`;
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': this.apiHost
    });
    return this.http.get<FootbalResponse>(url, { headers });
  }

  getPredictions(fixtureId: number): Observable<any> {
    const url = `${this.apiUrl}/predictions?fixture=${fixtureId}`;
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': this.apiKey,
      'X-RapidAPI-Host': this.apiHost
    });
    return this.http.get<any>(url, { headers });
  }
}
