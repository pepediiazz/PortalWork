import { Component, OnInit, Input } from '@angular/core';
import { FavoritesVolleyballService } from '../../../services/favorites-volleyball.service';
import { VolleyballGame } from '../../../interfaces/VolleyballResponse';
import { CommonModule, DatePipe } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { VolleyballService } from '../../../services/volleyball.service';

@Component({
  selector: 'app-volleyball-favorites',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  providers: [DatePipe],
  templateUrl: './volleyball-favorites.component.html',
  styleUrls: ['./volleyball-favorites.component.css']
})
export class VolleyballFavoritesComponent implements OnInit {
  @Input() isVisible: boolean = false;
  favorites: VolleyballGame[] = [];
  isModalVisible: boolean = false;
  selectedGame: VolleyballGame | null = null;

  constructor(private favoritesService: FavoritesVolleyballService, private datePipe: DatePipe, private volleyballService: VolleyballService) {}

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

  openModal(game: VolleyballGame): void {
    this.selectedGame = game;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedGame = null;
  }

  getStatusOrScore(game: VolleyballGame): string {
    const status = game.status.short;
    const gameDate = new Date(game.date);

    switch (status) {
      case 'NS':
        return this.datePipe.transform(gameDate, 'HH:mm', '', 'es') ?? 'Hora desconocida';
      case '1S':
      case '2S':
      case '3S':
      case '4S':
      case '5S':
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
      '1S': 'Primer Set',
      '2S': 'Segundo Set',
      '3S': 'Tercer Set',
      '4S': 'Cuarto Set',
      '5S': 'Quinto Set',
      'LIVE': 'En Vivo',
      'FT': 'Partido Terminado',
      'POST': 'Partido Aplazado',
      'CANC': 'Partido Cancelado',
      'SUSP': 'Partido Suspendido',
      'AWD': 'Partido Adjudicado',
      'ABD': 'Partido Abandonado',
      'WalkOver': 'WalkOver'
    };
    return statusTranslations[status] || status;
  }
}
