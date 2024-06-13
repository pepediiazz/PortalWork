import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import localeEs from '@angular/common/locales/es';
import { RouterModule, RouterOutlet } from '@angular/router';
import { VolleyballService } from '../../../services/volleyball.service';
import { VolleyballResponse, VolleyballGame } from '../../../interfaces/VolleyballResponse';
import { ModalComponent } from '../modal/modal.component';
import { FavoritesVolleyballService } from '../../../services/favorites-volleyball.service';

registerLocaleData(localeEs, 'es');

interface LeagueInfo {
  id: number;
  name: string;
  country: string;
  logo: string;
}

@Component({
  selector: 'app-ligas-populares-volleyball',
  standalone: true,
  providers: [DatePipe],
  imports: [RouterOutlet, CommonModule, RouterModule, HttpClientModule, FormsModule, ModalComponent],
  templateUrl: './ligas-populares-volleyball.component.html',
  styleUrls: ['./ligas-populares-volleyball.component.css']
})
export class LigasPopularesVolleyballComponent implements OnInit {
  constructor(
    private volleyballService: VolleyballService,
    private datePipe: DatePipe,
    private favoritesService: FavoritesVolleyballService
  ) {}

  ligaIds = [155, 89, 113, 97, 130, 66, 108, 63, 184, 183, 144, 38]; // Ejemplo de IDs de ligas populares
  leagues: LeagueInfo[] = [
    { id: 155, name: 'Superliga', country: 'Spain', logo: 'https://media.api-sports.io/volley/leagues/155.png' },
    { id: 89, name: 'Serie A1 Women', country: 'Italy', logo: 'https://media.api-sports.io/volley/leagues/89.png' },
    { id: 113, name: 'PlusLiga', country: 'Poland', logo: 'https://media.api-sports.io/volley/leagues/113.png' },
    { id: 97, name: 'SuperLega', country: 'Italy', logo: 'https://media.api-sports.io/volley/leagues/97.png' },
    { id: 130, name: 'Divizia A1', country: 'Romania', logo: 'https://media.api-sports.io/volley/leagues/130.png' },
    { id: 66, name: 'Bundesliga', country: 'Germany', logo: 'https://media.api-sports.io/volley/leagues/66.png' },
    { id: 108, name: 'Eliteserien', country: 'Norway', logo: 'https://media.api-sports.io/volley/leagues/108.png' },
    { id: 63, name: 'Ligue A', country: 'France', logo: 'https://media.api-sports.io/volley/leagues/63.png' },
    { id: 184, name: 'Nations League Women', country: 'World', logo: 'https://media.api-sports.io/volley/leagues/184.png' },
    { id: 183, name: 'Nations League', country: 'World', logo: 'https://media.api-sports.io/volley/leagues/183.png' },
    { id: 144, name: 'Volley League', country: 'Serbia', logo: 'https://media.api-sports.io/volley/leagues/144.png' },
    { id: 38, name: 'Extraliga', country: 'Czech Republic', logo: 'https://media.api-sports.io/volley/leagues/38.png' }
  ];
  
  volleyballData: { [key: number]: VolleyballGame[] } = {};
  selectedDate: string = new Date().toISOString().split('T')[0];
  showDatePicker: boolean = false;
  selectedGame: VolleyballGame | null = null;
  isModalVisible = false;

  private updateInterval = 5 * 60 * 1000; // 5 minutos en milisegundos

  ngOnInit(): void {
    this.loadFromLocalStorage();
  }

  getVolleyballData(date: string, forceUpdate: boolean = false): void {
    if (this.isLocalStorageAvailable() && !forceUpdate) {
      const cachedData = localStorage.getItem(`volleyballData-${date}`);
      const lastUpdated = localStorage.getItem(`volleyballData-${date}-lastUpdated`);
      const now = new Date().getTime();

      if (cachedData && lastUpdated) {
        const lastUpdatedTime = parseInt(lastUpdated, 10);
        if (now - lastUpdatedTime < this.updateInterval) {
          this.volleyballData = JSON.parse(cachedData);
          return;
        }
      }
    }

    this.volleyballService.getVolleyballByDate(date).subscribe({
      next: (data) => {
        this.volleyballData = this.groupByLeague(this.filterLeagues(data.response));
        if (this.isLocalStorageAvailable()) {
          const now = new Date().getTime();
          localStorage.setItem(`volleyballData-${date}`, JSON.stringify(this.volleyballData));
          localStorage.setItem(`volleyballData-${date}-lastUpdated`, now.toString());
        }
      },
      error: (err) => {
        console.error('Error fetching volleyball data', err);
      },
    });
  }

  filterLeagues(games: VolleyballGame[]): VolleyballGame[] {
    return games.filter(game => this.ligaIds.includes(game.league.id));
  }

  toggleDatePicker(): void {
    this.showDatePicker = !this.showDatePicker;
  }

  groupByLeague(games: VolleyballGame[]): { [key: number]: VolleyballGame[] } {
    return games.reduce((acc, game) => {
      if (!acc[game.league.id]) {
        acc[game.league.id] = [];
      }
      acc[game.league.id].push(game);
      return acc;
    }, {} as { [key: number]: VolleyballGame[] });
  }

  onDateChange(event: any): void {
    const selectedDate = event.target.value;
    this.selectedDate = selectedDate;
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('selectedDate', this.selectedDate);
    }
    this.getVolleyballData(this.selectedDate, true);
  }

  loadFromLocalStorage(): void {
    if (this.isLocalStorageAvailable()) {
      const savedDate = localStorage.getItem('selectedDate');
      if (savedDate) {
        this.selectedDate = savedDate;
        this.getVolleyballData(this.selectedDate, true);
        return;
      }
    }
    this.getVolleyballData(this.selectedDate, true);
  }

  isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorageTest__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  changeDate(days: number): void {
    const currentDate = new Date(this.selectedDate);
    currentDate.setDate(currentDate.getDate() + days);
    this.selectedDate = currentDate.toISOString().split('T')[0];
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('selectedDate', this.selectedDate);
    }
    this.getVolleyballData(this.selectedDate, true);
  }

  formatSelectedDate(): string {
    const date = new Date(this.selectedDate);
    const day = this.datePipe.transform(date, 'EEEE', '', 'es');
    const dayOfMonth = date.getDate();
    const month = this.datePipe.transform(date, 'MMMM', '', 'es');
    return `${day}, ${dayOfMonth} de ${month}`;
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

  openModal(game: VolleyballGame): void {
    this.selectedGame = game;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
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

  getLeagueInfo(leagueId: number): LeagueInfo | undefined {
    return this.leagues.find(league => league.id === leagueId);
  }

  toggleFavorite(game: VolleyballGame, event: Event): void {
    event.stopPropagation();
    if (this.isFavorite(game)) {
      this.favoritesService.removeFavorite(game.id);
    } else {
      this.favoritesService.addFavorite(game);
    }
  }

  isFavorite(game: VolleyballGame): boolean {
    return this.favoritesService.isFavorite(game.id);
  }
}
