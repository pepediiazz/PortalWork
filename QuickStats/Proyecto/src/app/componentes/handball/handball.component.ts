import { Component, ViewChild } from '@angular/core';
import { LigasPopularesHandballComponent } from './ligas-populares-handball/ligas-populares-handball.component';
import { HeaderComponent } from './header/header.component';
import { HandballCarouselComponent } from './handball-carousel/handball-carousel.component';
import { HandballPredictionCarouselComponent } from './handball-prediction-carousel/handball-prediction-carousel.component';
import { HandballNewsComponent } from './handball-news/handball-news.component';
import { HandballFavoritesComponent } from './handball-favorites/handball-favorites.component';

@Component({
  selector: 'app-handball',
  standalone: true,
  imports: [
    LigasPopularesHandballComponent,
    HeaderComponent,
    HandballCarouselComponent,
    HandballPredictionCarouselComponent,
    HandballNewsComponent,
    HandballFavoritesComponent
  ],
  templateUrl: './handball.component.html',
  styleUrls: ['./handball.component.css']
})
export class HandballComponent {
  @ViewChild('favoritesComponent') favoritesComponent!: HandballFavoritesComponent;

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
