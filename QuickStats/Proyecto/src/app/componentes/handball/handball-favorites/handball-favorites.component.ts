import { Component, OnInit, Input } from '@angular/core';
import { FavoritesHandballService } from '../../../services/favorites-handball.service';
import { HandballGame } from '../../../interfaces/HandballResponse';
import { CommonModule, DatePipe } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-handball-favorites',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  providers: [DatePipe],
  templateUrl: './handball-favorites.component.html',
  styleUrls: ['./handball-favorites.component.css']
})
export class HandballFavoritesComponent implements OnInit {
  @Input() isVisible: boolean = false;
  favorites: HandballGame[] = [];
  isModalVisible: boolean = false;
  selectedGame: HandballGame | null = null;

  constructor(private favoritesService: FavoritesHandballService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favorites = this.favoritesService.getFavorites();
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

  removeFavorite(gameId: number): void {
    this.favoritesService.removeFavorite(gameId);
    this.loadFavorites();
  }

  openModal(game: HandballGame): void {
    this.selectedGame = game;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedGame = null;
  }

  getStatusOrScore(game: HandballGame): string {
    const status = game.status.short;
    const gameDate = new Date(game.date);

    switch (status) {
      case 'NS':
        return this.datePipe.transform(gameDate, 'HH:mm', '', 'es') ?? 'Hora desconocida';
      case '1H':
      case '2H':
      case 'LIVE':
        return 'Jugando';
      case 'FT':
        const homeScore = game.scores.home !== null ? game.scores.home : 0;
        const awayScore = game.scores.away !== null ? game.scores.away : 0;
        return `${homeScore} - ${awayScore}`;
      case 'POST':
      case 'CANC':
      case 'SUSP':
      case 'AWD':
      case 'ABD':
      case 'WO':
        return this.translateStatus(game.status.long);
      default:
        return this.datePipe.transform(gameDate, 'HH:mm', '', 'es') ?? 'Hora desconocida';
    }
  }

  translateStatus(status: string): string {
    const statusTranslations: { [key: string]: string } = {
      'Not Started': 'No Empezado',
      'LIVE': 'Jugando',
      'Finished': 'Terminado',
      'Postponed': 'Aplazado',
      'Cancelled': 'Cancelado',
      'Interrupted': 'Interrumpido',
      'Abandoned': 'Abandonado',
      'Awarded': 'Adjudicado',
      'WalkOver': 'WalkOver'
    };
    return statusTranslations[status] || status;
  }
}
