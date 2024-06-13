import { Component, OnInit, Input } from '@angular/core';
import { FavoritesBaseballService } from '../../../services/favorites-baseball.service';
import { Game } from '../../../interfaces/BaseballResponse';
import { CommonModule, DatePipe } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { BaseballService } from '../../../services/baseball.service';

@Component({
  selector: 'app-baseball-favorites',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  providers: [DatePipe],
  templateUrl: './baseball-favorites.component.html',
  styleUrls: ['./baseball-favorites.component.css']
})
export class BaseballFavoritesComponent implements OnInit {
  @Input() isVisible: boolean = false;
  favorites: Game[] = [];
  isModalVisible: boolean = false;
  selectedGame: Game | null = null;

  constructor(private favoritesService: FavoritesBaseballService, private datePipe: DatePipe, private baseballService: BaseballService) {}

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
      case 'IN1':
      case 'IN2':
      case 'IN3':
      case 'IN4':
      case 'IN5':
      case 'IN6':
      case 'IN7':
      case 'IN8':
      case 'IN9':
      case 'LIVE':
        return 'Jugando';
      case 'FT':
        const homeScore = game.scores.home.total !== null ? game.scores.home.total : 0;
        const awayScore = game.scores.away.total !== null ? game.scores.away.total : 0;
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
      'NS': 'No Empezado',
      'IN1': 'Inning 1',
      'IN2': 'Inning 2',
      'IN3': 'Inning 3',
      'IN4': 'Inning 4',
      'IN5': 'Inning 5',
      'IN6': 'Inning 6',
      'IN7': 'Inning 7',
      'IN8': 'Inning 8',
      'IN9': 'Inning 9',
      'LIVE': 'Jugando',
      'FT': 'Partido Terminado',
      'POST': 'Aplazado',
      'CANC': 'Partido Cancelado',
      'INTR': 'Partido Interrumpido',
      'ABD': 'Partido Abandonado',
      'AWD': 'Partido Adjudicado',
      'Postponed': 'Aplazado',
      'WO': 'WalkOver'
    };
    return statusTranslations[status] || status;
  }
}
