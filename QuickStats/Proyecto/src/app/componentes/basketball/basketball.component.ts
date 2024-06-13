import { Component, ViewChild } from '@angular/core';
import { LigasPopularesBasketballComponent } from './ligas-populares-basketball/ligas-populares-basketball.component';
import { HeaderComponent } from './header/header.component';
import { BasketballCarouselComponent } from './basketball-carousel/basketball-carousel.component';
import { BasketballPredictionCarouselComponent } from './carousel-prediccion-basketball/basketball-prediction-carousel.component';
import { BasketballNewsComponent } from './basketball-news/basketball-news.component';
import { BasketballFavoritesComponent } from './basketball-favorites/basketball-favorites.component';

@Component({
  selector: 'app-basketball',
  standalone: true,
  imports: [
    LigasPopularesBasketballComponent,
    HeaderComponent,
    BasketballCarouselComponent,
    BasketballPredictionCarouselComponent,
    BasketballNewsComponent,
    BasketballFavoritesComponent
  ],
  templateUrl: './basketball.component.html',
  styleUrls: ['./basketball.component.css']
})
export class BasketballComponent {
  @ViewChild('favoritesComponent') favoritesComponent!: BasketballFavoritesComponent;

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
