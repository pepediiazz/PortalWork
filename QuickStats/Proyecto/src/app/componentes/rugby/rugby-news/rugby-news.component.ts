import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NewsService } from '../../../services/sports-news.service'; // Ajusta la ruta según sea necesario
import { Article } from '../../../interfaces/news-response.interface'; // Ajusta la ruta según sea necesario
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-rugby-news',
  templateUrl: './rugby-news.component.html',
  styleUrls: ['./rugby-news.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  animations: [
    trigger('newsAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('500ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' })),
      ]),
    ]),
  ],
})
export class RugbyNewsComponent implements OnInit {
  articles: Article[] = [];
  displayedArticles: Article[] = [];
  loading = true;
  private currentIndex = 0;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.fetchNews('rugby');
  }

  fetchNews(category: string): void {
    this.newsService.getNewsByCategory(category).subscribe(data => {
      this.articles = data.filter(article => this.isValidArticle(article));
      this.displayedArticles = this.articles.slice(0, 3);
      this.loading = false;
    });
  }

  isValidArticle(article: Article): boolean {
    const invalidKeywords = ['PESTAÑA', 'COMPONENTE', 'REMOVED'];
    const regex = new RegExp(invalidKeywords.join('|'), 'i');
    return !regex.test(article.title) && !regex.test(article.description);
  }

  loadMoreNews(): void {
    this.currentIndex += 3;
    if (this.currentIndex >= this.articles.length) {
      this.currentIndex = 0;
    }
    this.displayedArticles = [];
    setTimeout(() => {
      this.displayedArticles = this.articles.slice(this.currentIndex, this.currentIndex + 3);
    }, 500); // Duración de la animación de salida
  }
}
