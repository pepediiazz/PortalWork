import { Component, ViewChild } from '@angular/core';
import { LigasPopularesHockeyComponent } from './ligas-populares-hockey/ligas-populares-hockey.component';
import { HeaderComponent } from './header/header.component';
import { HockeyCarouselComponent } from './hockey-carousel/hockey-carousel.component';
import { HockeyPredictionCarouselComponent } from './hockey-prediction-carousel/hockey-prediction-carousel.component';
import { HockeyNewsComponent } from './hockey-news/hockey-news.component';
import { HockeyFavoritesComponent } from './hockey-favorites/hockey-favorites.component';

@Component({
  selector: 'app-hockey',
  standalone: true,
  imports: [
    LigasPopularesHockeyComponent,
    HeaderComponent,
    HockeyCarouselComponent,
    HockeyPredictionCarouselComponent,
    HockeyNewsComponent,
    HockeyFavoritesComponent
  ],
  templateUrl: './hockey.component.html',
  styleUrls: ['./hockey.component.css']
})
export class HockeyComponent {
  @ViewChild('favoritesComponent') favoritesComponent!: HockeyFavoritesComponent;

  isFavoritesVisible: boolean = false;

  onToggleFavoritesVisibility(): void {
    this.isFavoritesVisible = !this.isFavoritesVisible;
    if (this.isFavoritesVisible && this.favoritesComponent) {
      this.favoritesComponent.isVisible = true;
      setTimeout(() => {
        const favoritesSection = document.querySelector('.favorites-container');
        if (favoritesSection) {
          favoritesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 0);
    } else if (this.favoritesComponent) {
      this.favoritesComponent.isVisible = false;
    }
  }
}
