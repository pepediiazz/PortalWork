import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NewsResponse, Article } from '../interfaces/news-response.interface';  // Ajusta la ruta según sea necesario

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private http = inject(HttpClient);
  private apiUrl = 'https://quickstats.es:3000/news'; // Asegúrate de que esto usa HTTPS y el dominio

  constructor() {}

  getNewsByCategory(category: string, page: number = 1): Observable<Article[]> {
    const url = `${this.apiUrl}?q=${category}&page=${page}&language=es`;
    return this.http.get<NewsResponse>(url).pipe(
      map(response => response.articles),
      catchError(error => {
        console.error('Error fetching data', error);
        return throwError(() => new Error('Error fetching data'));
      })
    );
  }
}
