import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NewsService } from '../../../services/sports-news.service'; // Ajusta la ruta según sea necesario
import { Article } from '../../../interfaces/news-response.interface'; // Ajusta la ruta según sea necesario

@Component({
  selector: 'app-football-news',
  templateUrl: './football-news.component.html',
  styleUrls: ['./football-news.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]  // Asegúrate de importar CommonModule y HttpClientModule
})
export class FootballNewsComponent implements OnInit {
  articles: Article[] = [];
  displayedArticles: Article[] = [];
  loading = true;
  private currentIndex = 0;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.fetchNews('futbol');
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
