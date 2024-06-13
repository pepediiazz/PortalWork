import { Component, OnInit, Input } from '@angular/core';
import { FavoritesHockeyService } from '../../../services/favorites-hockey.service';
import { Game } from '../../../interfaces/HockeyResponse';
import { CommonModule, DatePipe } from '@angular/common';
import { ModalHockeyComponent } from '../modal/modal.component';
import { HockeyService } from '../../../services/hockey.service';

@Component({
  selector: 'app-hockey-favorites',
  standalone: true,
  imports: [CommonModule, ModalHockeyComponent],
  providers: [DatePipe],
  templateUrl: './hockey-favorites.component.html',
  styleUrls: ['./hockey-favorites.component.css']
})
export class HockeyFavoritesComponent implements OnInit {
  @Input() isVisible: boolean = false;
  favorites: Game[] = [];
  isModalVisible: boolean = false;
  selectedGame: Game | null = null;

  constructor(private favoritesService: FavoritesHockeyService, private datePipe: DatePipe, private hockeyService: HockeyService) {}

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
      case 'LIVE':
        return 'Jugando';
      case 'FT':
      case 'AOT':
        const homeScore = game.scores.home ?? 0;
        const awayScore = game.scores.away ?? 0;
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
