import { Component, OnInit, Input } from '@angular/core';
import { FavoritesRugbyService } from '../../../services/favorites-rugby.service';
import { Game } from '../../../interfaces/RugbyResponse';
import { CommonModule, DatePipe } from '@angular/common';
import { ModalRugbyComponent } from '../modal/modal.component';
import { RugbyService } from '../../../services/rugby.service';

@Component({
  selector: 'app-rugby-favorites',
  standalone: true,
  imports: [CommonModule, ModalRugbyComponent],
  providers: [DatePipe],
  templateUrl: './rugby-favorites.component.html',
  styleUrls: ['./rugby-favorites.component.css']
})
export class RugbyFavoritesComponent implements OnInit {
  @Input() isVisible: boolean = false;
  favorites: Game[] = [];
  isModalVisible: boolean = false;
  selectedGame: Game | null = null;

  constructor(private favoritesService: FavoritesRugbyService, private datePipe: DatePipe, private rugbyService: RugbyService) {}

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

  openModal(game: Game): void {
    this.selectedGame = game;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedGame = null;
  }

  getStatusOrScore(game: Game): string {
    const status = game.status.short;
    const gameDate = new Date(game.date);

    switch (status) {
      case 'NS':
        return this.datePipe.transform(gameDate, 'HH:mm', '', 'es') ?? 'Hora desconocida';
      case '1H':
      case '2H':
      case 'HT':
      case 'ET':
      case 'BT':
      case 'PT':
      case 'LIVE':
        return 'Jugando';
      case 'FT':
      case 'AET':
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
