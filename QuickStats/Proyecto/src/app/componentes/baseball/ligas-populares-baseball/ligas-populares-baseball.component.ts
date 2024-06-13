import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import localeEs from '@angular/common/locales/es';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BaseballService } from '../../../services/baseball.service';
import { BaseballResponse, Game } from '../../../interfaces/BaseballResponse';
import { ModalComponent } from '../modal/modal.component';
import { FavoritesBaseballService } from '../../../services/favorites-baseball.service';

registerLocaleData(localeEs, 'es');

interface LeagueInfo {
  id: number;
  name: string;
  country: string;
  logo: string;
}

@Component({
  selector: 'app-ligas-populares-baseball',
  standalone: true,
  providers: [DatePipe],
  imports: [RouterOutlet, RouterModule, CommonModule, HttpClientModule, FormsModule, ModalComponent],
  templateUrl: './ligas-populares-baseball.component.html',
  styleUrls: ['./ligas-populares-baseball.component.css']
})
export class LigasPopularesBaseballComponent implements OnInit {
  constructor(private baseballService: BaseballService, private datePipe: DatePipe, private favoritesService: FavoritesBaseballService) {}

  ligaIds = [1, 2, 21, 5, 31, 11, 9, 29, 8, 6]; // IDs de ligas de béisbol
  leagues: LeagueInfo[] = [
    { id: 1, name: 'MLB', country: 'USA', logo: 'https://media.api-sports.io/baseball/leagues/1.png' },
    { id: 2, name: 'NPB', country: 'Japan', logo: 'https://media.api-sports.io/baseball/leagues/2.png' },
    { id: 21, name: 'LMB', country: 'Mexico', logo: 'https://media.api-sports.io/baseball/leagues/21.png' },
    { id: 5, name: 'KBO', country: 'South-Korea', logo: 'https://media.api-sports.io/baseball/leagues/5.png' },
    { id: 31, name: 'LVBP', country: 'Venezuela', logo: 'https://media.api-sports.io/baseball/leagues/31.png' },
    { id: 11, name: 'LIDOM', country: 'Dominican-Republic', logo: 'https://media.api-sports.io/baseball/leagues/11.png' },
    { id: 9, name: 'Serie Nacional', country: 'Cuba', logo: 'https://media.api-sports.io/baseball/leagues/9.png' },
    { id: 29, name: 'CPBL', country: 'Taiwan', logo: 'https://media.api-sports.io/baseball/leagues/29.png' },
    { id: 8, name: 'LCBP', country: 'Colombia', logo: 'https://media.api-sports.io/baseball/leagues/8.png' },
    { id: 6, name: 'ABL', country: 'Australia', logo: 'https://media.api-sports.io/baseball/leagues/6.png' }
  ];
  baseballData: { [key: number]: Game[] } = {};
  selectedDate: string = new Date().toISOString().split('T')[0];
  showDatePicker: boolean = false;
  selectedGame: Game | null = null;
  isModalVisible = false;

  private updateInterval = 5 * 60 * 1000; // 5 minutos en milisegundos

  ngOnInit(): void {
    this.loadFromLocalStorage();
  }

  getBaseballData(date: string, forceUpdate: boolean = false): void {
    if (this.isLocalStorageAvailable() && !forceUpdate) {
      const cachedData = localStorage.getItem(`baseballData-${date}`);
      const lastUpdated = localStorage.getItem(`baseballData-${date}-lastUpdated`);
      const now = new Date().getTime();

      if (cachedData && lastUpdated) {
        const lastUpdatedTime = parseInt(lastUpdated, 10);
        if (now - lastUpdatedTime < this.updateInterval) {
          this.baseballData = JSON.parse(cachedData);
          return;
        }
      }
    }

    this.baseballService.getBaseballByDate(date).subscribe({
      next: (data) => {
        this.baseballData = this.groupByLeague(this.filterLeagues(data.response));
        if (this.isLocalStorageAvailable()) {
          const now = new Date().getTime();
          localStorage.setItem(`baseballData-${date}`, JSON.stringify(this.baseballData));
          localStorage.setItem(`baseballData-${date}-lastUpdated`, now.toString());
        }
      },
      error: (err) => {
        console.error('Error fetching baseball data', err);
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
    this.getBaseballData(this.selectedDate, true);
  }

  loadFromLocalStorage(): void {
    if (this.isLocalStorageAvailable()) {
      const savedDate = localStorage.getItem('selectedDate');
      if (savedDate) {
        this.selectedDate = savedDate;
        this.getBaseballData(this.selectedDate, true);
        return;
      }
    }
    this.getBaseballData(this.selectedDate, true);
  }
  toggleDatePicker(): void {
    this.showDatePicker = !this.showDatePicker;
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
    this.getBaseballData(this.selectedDate, true);
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

  openModal(game: Game): void {
    this.selectedGame = game;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
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
      'Postponed':'Aplazado',
      'WO': 'WalkOver'
    };
    return statusTranslations[status] || status;
  }

  getLeagueInfo(leagueId: number): LeagueInfo | undefined {
    return this.leagues.find(league => league.id === leagueId);
  }

  isFavorite(game: Game): boolean {
    return this.favoritesService.isFavorite(game.id);
  }

  toggleFavorite(game: Game): void {
    if (this.isFavorite(game)) {
      this.favoritesService.removeFavorite(game.id);
    } else {
      this.favoritesService.addFavorite(game);
    }
  }
}
