import { Component, ViewChild } from '@angular/core';
import { LigasPopularesVolleyballComponent } from './ligas-populares-volleyball/ligas-populares-volleyball.component';
import { HeaderComponent } from './header/header.component';
import { VolleyballCarouselComponent } from './volleyball-carousel/volleyball-carousel.component';
import { VolleyballPredictionCarouselComponent } from './volleyball-prediction-carousel/volleyball-prediction-carousel.component';
import { VolleyballNewsComponent } from './volleyball-news/volleyball-news.component';
import { VolleyballFavoritesComponent } from './volleyball-favorites/volleyball-favorites.component';

@Component({
  selector: 'app-volleyball',
  standalone: true,
  imports: [
    LigasPopularesVolleyballComponent,
    HeaderComponent,
    VolleyballCarouselComponent,
    VolleyballPredictionCarouselComponent,
    VolleyballNewsComponent,
    VolleyballFavoritesComponent
  ],
  templateUrl: './volleyball.component.html',
  styleUrls: ['./volleyball.component.css']
})
export class VolleyballComponent {
  @ViewChild('favoritesComponent') favoritesComponent!: VolleyballFavoritesComponent;

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
