import { Component, ViewChild } from '@angular/core';
import { LigasPopularesBaseballComponent } from './ligas-populares-baseball/ligas-populares-baseball.component';
import { HeaderComponent } from './header/header.component';
import { BaseballCarouselComponent } from './baseball-carousel/baseball-carousel.component';
import { BaseballPredictionCarouselComponent } from './baseball-prediction-carousel/baseball-prediction-carousel.component';
import { BaseballNewsComponent } from './baseball-news/baseball-news.component';
import { BaseballFavoritesComponent } from './baseball-favorites/baseball-favorites.component';

@Component({
  selector: 'app-baseball',
  standalone: true,
  imports: [
    LigasPopularesBaseballComponent,
    HeaderComponent,
    BaseballCarouselComponent,
    BaseballPredictionCarouselComponent,
    BaseballNewsComponent,
    BaseballFavoritesComponent
  ],
  templateUrl: './baseball.component.html',
  styleUrls: ['./baseball.component.css']
})
export class BaseballComponent {
  @ViewChild('favoritesComponent') favoritesComponent!: BaseballFavoritesComponent;

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
