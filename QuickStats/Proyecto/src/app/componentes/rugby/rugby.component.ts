import { Component, ViewChild } from '@angular/core';
import { LigasPopularesRugbyComponent } from './ligas-populares-rugby/ligas-populares-rugby.component';
import { HeaderComponent } from './header/header.component';
import { RugbyCarouselComponent } from './rugby-carousel/rugby-carousel.component';
import { RugbyPredictionCarouselComponent } from './carousel-prediction-rugby/rugby-prediction-carousel.component';
import { RugbyNewsComponent } from './rugby-news/rugby-news.component';
import { RugbyFavoritesComponent } from './rugby-favorites/rugby-favorites.component';

@Component({
  selector: 'app-rugby',
  standalone: true,
  imports: [
    LigasPopularesRugbyComponent,
    HeaderComponent,
    RugbyCarouselComponent,
    RugbyPredictionCarouselComponent,
    RugbyNewsComponent,
    RugbyFavoritesComponent
  ],
  templateUrl: './rugby.component.html',
  styleUrls: ['./rugby.component.css']
})
export class RugbyComponent {
  @ViewChild('favoritesComponent') favoritesComponent!: RugbyFavoritesComponent;

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
