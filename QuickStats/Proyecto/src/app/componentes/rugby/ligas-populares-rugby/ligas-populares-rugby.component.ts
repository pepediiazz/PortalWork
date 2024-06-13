import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import localeEs from '@angular/common/locales/es';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RugbyService } from '../../../services/rugby.service';
import { RugbyResponse, Game } from '../../../interfaces/RugbyResponse';
import { ModalRugbyComponent } from '../modal/modal.component';
import { FavoritesRugbyService } from '../../../services/favorites-rugby.service';

registerLocaleData(localeEs, 'es');

interface LeagueInfo {
  id: number;
  name: string;
  country: string;
  logo: string;
}

@Component({
  selector: 'app-ligas-populares-rugby',
  standalone: true,
  providers: [DatePipe],
  imports: [RouterOutlet, CommonModule, RouterModule, HttpClientModule, FormsModule, ModalRugbyComponent],
  templateUrl: './ligas-populares-rugby.component.html',
  styleUrls: ['./ligas-populares-rugby.component.css']
})
export class LigasPopularesRugbyComponent implements OnInit {
  constructor(
    private rugbyService: RugbyService,
    private datePipe: DatePipe,
    private favoritesService: FavoritesRugbyService
  ) {}

  ligaIds = [51, 85, 71, 13, 16, 76, 44, 37, 27, 54]; // IDs de ligas de rugby
  leagues: LeagueInfo[] = [
    { id: 51, name: 'Six Nations', country: 'Europe', logo: 'https://media.api-sports.io/rugby/leagues/51.png' },
    { id: 85, name: 'Rugby Championship', country: 'International', logo: 'https://media.api-sports.io/rugby/leagues/85.png' },
    { id: 71, name: 'Super Rugby', country: 'International', logo: 'https://media.api-sports.io/rugby/leagues/71.png' },
    { id: 13, name: 'Aviva Premiership Rugby', country: 'England', logo: 'https://media.api-sports.io/rugby/leagues/13.png' },
    { id: 16, name: 'Top 14', country: 'France', logo: 'https://media.api-sports.io/rugby/leagues/16.png' },
    { id: 76, name: 'United Rugby Championship', country: 'International', logo: 'https://media.api-sports.io/rugby/leagues/76.png' },
    { id: 44, name: 'Major League Rugby', country: 'USA', logo: 'https://media.api-sports.io/rugby/leagues/44.png' },
    { id: 37, name: 'Currie Cup', country: 'South-Africa', logo: 'https://media.api-sports.io/rugby/leagues/37.png' },
    { id: 27, name: 'Top League', country: 'Japan', logo: 'https://media.api-sports.io/rugby/leagues/27.png' },
    { id: 54, name: 'REuropean Rugby Champions Cup', country: 'Europe', logo: 'https://media.api-sports.io/rugby/leagues/54.png' }
  ];
  rugbyData: { [key: number]: Game[] } = {};
  selectedDate: string = new Date().toISOString().split('T')[0];
  showDatePicker: boolean = false;
  selectedGame: Game | null = null;
  isModalVisible = false;

  private updateInterval = 5 * 60 * 1000; // 5 minutos en milisegundos

  ngOnInit(): void {
    this.loadFromLocalStorage();
  }

  getRugbyData(date: string, forceUpdate: boolean = false): void {
    if (this.isLocalStorageAvailable() && !forceUpdate) {
      const cachedData = localStorage.getItem(`rugbyData-${date}`);
      const lastUpdated = localStorage.getItem(`rugbyData-${date}-lastUpdated`);
      const now = new Date().getTime();

      if (cachedData && lastUpdated) {
        const lastUpdatedTime = parseInt(lastUpdated, 10);
        if (now - lastUpdatedTime < this.updateInterval) {
          this.rugbyData = JSON.parse(cachedData);
          return;
        }
      }
    }

    this.rugbyService.getRugbyByDate(date).subscribe({
      next: (data) => {
        this.rugbyData = this.groupByLeague(this.filterLeagues(data.response));
        if (this.isLocalStorageAvailable()) {
          const now = new Date().getTime();
          localStorage.setItem(`rugbyData-${date}`, JSON.stringify(this.rugbyData));
          localStorage.setItem(`rugbyData-${date}-lastUpdated`, now.toString());
        }
      },
      error: (err) => {
        console.error('Error fetching rugby data', err);
      },
    });
  }

  filterLeagues(games: Game[]): Game[] {
    return games.filter(game => this.ligaIds.includes(game.league.id));
  }

  groupByLeague(games: Game[]): { [key: number]: Game[] } {
    return games.reduce((acc, game) => {
      if (!acc[game.league.id]) {
        acc[game.league.id] = [];
      }
      acc[game.league.id].push(game);
      return acc;
    }, {} as { [key: number]: Game[] });
  }

  onDateChange(event: any): void {
    const selectedDate = event.target.value;
    this.selectedDate = selectedDate;
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('selectedDate', this.selectedDate);
    }
    this.getRugbyData(this.selectedDate, true);
  }

  loadFromLocalStorage(): void {
    if (this.isLocalStorageAvailable()) {
      const savedDate = localStorage.getItem('selectedDate');
      if (savedDate) {
        this.selectedDate = savedDate;
        this.getRugbyData(this.selectedDate, true);
        return;
      }
    }
    this.getRugbyData(this.selectedDate, true);
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
    this.getRugbyData(this.selectedDate, true);
  }

  formatSelectedDate(): string {
    const date = new Date(this.selectedDate);
    const day = this.datePipe.transform(date, 'EEEE', '', 'es');
    const dayOfMonth = date.getDate();
    const month = this.datePipe.transform(date, 'MMMM', '', 'es');
    return `${day}, ${dayOfMonth} de ${month}`;
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
      case 'AET': // After Extra Time
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

  openModal(game: Game): void {
    this.selectedGame = game;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  toggleDatePicker(): void {
    this.showDatePicker = !this.showDatePicker;
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

  getLeagueInfo(leagueId: number): LeagueInfo | undefined {
    return this.leagues.find(league => league.id === leagueId);
  }

  toggleFavorite(game: Game, event: Event): void {
    event.stopPropagation();
    if (this.isFavorite(game)) {
      this.favoritesService.removeFavorite(game.id);
    } else {
      this.favoritesService.addFavorite(game);
    }
  }

  isFavorite(game: Game): boolean {
    return this.favoritesService.isFavorite(game.id);
  }
}
