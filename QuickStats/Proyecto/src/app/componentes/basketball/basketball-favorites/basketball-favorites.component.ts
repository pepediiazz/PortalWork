import { Component, OnInit, Input } from '@angular/core';
import { BasketballFavoritesService } from '../../../services/favorites-basketball.service';
import { Game } from '../../../interfaces/BasketballResponse';
import { CommonModule, DatePipe } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { BasketballService } from '../../../services/basketball.service';

@Component({
  selector: 'app-basketball-favorites',
  standalone: true,
  imports: [CommonModule, ModalComponent],  // Asegúrate de que ModalComponent está incluido aquí
  providers: [DatePipe],
  templateUrl: './basketball-favorites.component.html',
  styleUrls: ['./basketball-favorites.component.css']
})
export class BasketballFavoritesComponent implements OnInit {
  @Input() isVisible: boolean = false;
  favorites: Game[] = [];
  isModalVisible: boolean = false;
  selectedGame: Game | null = null;

  constructor(private favoritesService: BasketballFavoritesService, private datePipe: DatePipe, private basketballService: BasketballService) {}

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
      case 'Q1':
      case 'Q2':
      case 'Q3':
      case 'Q4':
      case 'OT':
      case 'BT':
      case 'HT':
      case 'LIVE':
        return 'Jugando';
      case 'FT':
      case 'AOT':
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
      'Not Started': 'No Empezado',
      'Quarter 1': 'Primer Cuarto',
      'Quarter 2': 'Segundo Cuarto',
      'Quarter 3': 'Tercer Cuarto',
      'Quarter 4': 'Cuarto Cuarto',
      'Over Time': 'Tiempo Extra',
      'Break Time': 'Tiempo de Descanso',
      'HalfTime': 'Medio Tiempo',
      'Game Finished': 'Partido Terminado',
      'After Over Time': 'Después de Tiempo Extra',
      'Game Postponed': 'Partido Aplazado',
      'Game Cancelled': 'Partido Cancelado',
      'Game Suspended': 'Partido Suspendido',
      'Game Awarded': 'Partido Adjudicado',
      'Game Abandoned': 'Partido Abandonado',
      'WalkOver': 'WalkOver',
      'NS': 'No Empezado',
      'Q1': 'Primer Cuarto',
      'Q2': 'Segundo Cuarto',
      'Q3': 'Tercer Cuarto',
      'Q4': 'Cuarto Cuarto',
      'OT': 'Tiempo Extra',
      'BT': 'Tiempo de Descanso',
      'HT': 'Medio Tiempo',
      'FT': 'Partido Terminado',
      'AOT': 'Después de Tiempo Extra',
      'POST': 'Partido Aplazado',
      'CANC': 'Partido Cancelado',
      'SUSP': 'Partido Suspendido',
      'AWD': 'Partido Adjudicado',
      'ABD': 'Partido Abandonado',
      'LIVE': 'En Vivo',
      'TBD': 'Hora por definir'
    };
    return statusTranslations[status] || status;
  }
}
