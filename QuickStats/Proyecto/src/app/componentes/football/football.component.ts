import { Component, ViewChild } from '@angular/core';
import { LigasPopularesComponent } from './ligas-populares/ligas-populares.component';
import { ModalComponent } from './modal/modal.component';
import { LineupComponent } from './lineup/lineup.component';
import { HeaderComponent } from './header/header.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CommonModule } from '@angular/common';
import { CarouselPrediccionComponent } from './carousel-prediccion/carousel-prediccion.component';
import { FootballNewsComponent } from './football-news/football-news.component';
import { FavoritesComponent } from './favorites/favorites.component';

@Component({
  selector: 'app-football',
  standalone: true,
  imports: [
    LigasPopularesComponent,
    ModalComponent,
    FavoritesComponent,
    LineupComponent,
    HeaderComponent,
    CarouselComponent,
    CommonModule,
    CarouselPrediccionComponent,
    FootballNewsComponent
  ],
  templateUrl: './football.component.html',
  styleUrls: ['./football.component.css']
})
export class FootballComponent {
  @ViewChild('favoritesComponent') favoritesComponent!: FavoritesComponent;

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
