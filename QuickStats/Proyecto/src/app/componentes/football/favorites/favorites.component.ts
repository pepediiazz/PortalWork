import { Component, OnInit, Input } from '@angular/core';
import { FavoritesService } from '../../../services/favorites.service';
import { Match } from '../../../interfaces/FootballResponse';
import { CommonModule, DatePipe } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { FootbalService } from '../../../services/football.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  providers: [DatePipe],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  @Input() isVisible: boolean = false;
  favorites: Match[] = [];
  isModalVisible: boolean = false;
  selectedMatch: Match | null = null;

  constructor(private favoritesService: FavoritesService, private datePipe: DatePipe, private footbalService: FootbalService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favorites = this.favoritesService.getFavorites();
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

  removeFavorite(matchId: number): void {
    this.favoritesService.removeFavorite(matchId);
    this.loadFavorites();
  }

  openModal(match: Match): void {
    this.selectedMatch = match;
    this.isModalVisible = true;
    this.loadMatchDetails(match.fixture.id);
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedMatch = null;
  }

  private async loadMatchDetails(fixtureId: number): Promise<void> {
    try {
      const [statisticsData, eventsData, lineupsData] = await Promise.all([
        this.footbalService.getFixtureStatistics(fixtureId).toPromise(),
        this.footbalService.getFixtureEvents(fixtureId).toPromise(),
        this.footbalService.getLineups(fixtureId).toPromise()
      ]);

      if (this.selectedMatch) {
        console.log('Statistics Data:', statisticsData);
        console.log('Events Data:', eventsData);
        console.log('Lineups Data:', lineupsData);

        this.selectedMatch.statistics = statisticsData.response;
        this.selectedMatch.events = eventsData.response;
        this.selectedMatch.lineups = lineupsData.response;
      }
    } catch (err) {
      console.error('Error fetching match details', err);
    }
  }

  getStatusOrScore(match: Match): string {
    const status = match.fixture.status.short;
    const fixtureDate = new Date(match.fixture.date);

    switch (status) {
      case 'TBD':
      case 'NS':
        return this.datePipe.transform(fixtureDate, 'HH:mm', '', 'es') || 'Hora desconocida';
      case '1H':
      case 'HT':
      case '2H':
      case 'ET':
      case 'BT':
      case 'P':
      case 'SUSP':
      case 'INT':
      case 'LIVE':
        return 'Jugando';
      case 'FT':
      case 'AET':
      case 'PEN':
        return `${match.goals.home || 0} - ${match.goals.away || 0}`;
      case 'PST':
      case 'CANC':
      case 'ABD':
      case 'AWD':
      case 'WO':
        return this.translateStatus(match.fixture.status.long);
      default:
        return this.datePipe.transform(fixtureDate, 'HH:mm', '', 'es') || 'Hora desconocida';
    }
  }

  translateStatus(status: string): string {
    const statusTranslations: { [key: string]: string } = {
      'Time To Be Defined': 'Hora por definir',
      'Not Started': 'No Empezado',
      'First Half, Kick Off': 'Primera mitad, Comienzo',
      'Halftime': 'Medio Tiempo',
      'Second Half': 'Segunda mitad',
      'Extra Time': 'Tiempo Extra',
      'Break Time': 'Descanso',
      'Penalty In Progress': 'Penal en Progreso',
      'Match Suspended': 'Partido Suspendido',
      'Match Interrupted': 'Partido Interrumpido',
      'Match Finished': 'Partido Terminado',
      'Match Finished after extra time': 'Partido Terminado después de tiempo extra',
      'Match Finished after the penalty shootout': 'Partido Terminado después de los penales',
      'Match Postponed': 'Partido Aplazado',
      'Match Cancelled': 'Partido Cancelado',
      'Match Abandoned': 'Partido Abandonado',
      'Technical Loss': 'Pérdida Técnica',
      'WalkOver': 'Victoria por W.O.',
      'In Progress': 'En Progreso'
    };
    return statusTranslations[status] || status;
  }
}
