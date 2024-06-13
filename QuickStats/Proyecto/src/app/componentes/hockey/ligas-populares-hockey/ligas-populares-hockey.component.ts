import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import localeEs from '@angular/common/locales/es';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HockeyService } from '../../../services/hockey.service';
import { HockeyResponse, Game } from '../../../interfaces/HockeyResponse';
import { ModalHockeyComponent } from '../modal/modal.component';
import { FavoritesHockeyService } from '../../../services/favorites-hockey.service';

registerLocaleData(localeEs, 'es');

interface LeagueInfo {
  id: number;
  name: string;
  country: string;
  logo: string;
}

@Component({
  selector: 'app-ligas-populares-hockey',
  standalone: true,
  providers: [DatePipe],
  imports: [RouterOutlet, RouterModule, CommonModule, HttpClientModule, FormsModule, ModalHockeyComponent],
  templateUrl: './ligas-populares-hockey.component.html',
  styleUrls: ['./ligas-populares-hockey.component.css']
})
export class LigasPopularesHockeyComponent implements OnInit {
  constructor(
    private hockeyService: HockeyService,
    private datePipe: DatePipe,
    private favoritesService: FavoritesHockeyService
  ) {}

  ligaIds = [57, 35, 47, 14, 50, 19, 10, 58, 3, 5]; // IDs de ligas de hockey
  leagues: LeagueInfo[] = [
    { id: 57, name: 'NHL', country: 'USA', logo: 'https://media.api-sports.io/hockey/leagues/57.png' },
    { id: 35, name: 'KHL', country: 'Russia', logo: 'https://media.api-sports.io/hockey/leagues/35.png' },
    { id: 47, name: 'SHL', country: 'Sweden', logo: 'https://media.api-sports.io/hockey/leagues/47.png' },
    { id: 14, name: 'Mestis', country: 'Finland', logo: 'https://media.api-sports.io/hockey/leagues/14.png' },
    { id: 50, name: 'Swiss Cup', country: 'Switzerland', logo: 'https://media.api-sports.io/hockey/leagues/50.png' },
    { id: 10, name: 'Extraliga', country: 'Czech Republic', logo: 'https://media.api-sports.io/hockey/leagues/10.png' },
    { id: 51, name: 'National League', country: 'Switzerland', logo: 'https://media.api-sports.io/hockey/leagues/51.png' },
    { id: 58, name: 'AHL', country: 'USA', logo: 'https://media.api-sports.io/hockey/leagues/58.png' },
    { id: 3, name: 'OHL', country: 'Canada', logo: 'https://media.api-sports.io/hockey/leagues/3.png' },
    { id: 5, name: 'QMJHL', country: 'Canada', logo: 'https://media.api-sports.io/hockey/leagues/5.png' }
  ];
  hockeyData: { [key: number]: Game[] } = {};
  selectedDate: string = new Date().toISOString().split('T')[0];
  showDatePicker: boolean = false;
  selectedGame: Game | null = null;
  isModalVisible = false;

  private updateInterval = 5 * 60 * 1000; // 5 minutos en milisegundos

  ngOnInit(): void {
    this.loadFromLocalStorage();
  }

  getHockeyData(date: string, forceUpdate: boolean = false): void {
    if (this.isLocalStorageAvailable() && !forceUpdate) {
      const cachedData = localStorage.getItem(`hockeyData-${date}`);
      const lastUpdated = localStorage.getItem(`hockeyData-${date}-lastUpdated`);
      const now = new Date().getTime();

      if (cachedData && lastUpdated) {
        const lastUpdatedTime = parseInt(lastUpdated, 10);
        if (now - lastUpdatedTime < this.updateInterval) {
          this.hockeyData = JSON.parse(cachedData);
          return;
        }
      }
    }

    this.hockeyService.getHockeyByDate(date).subscribe({
      next: (data) => {
        this.hockeyData = this.groupByLeague(this.filterLeagues(data.response));
        if (this.isLocalStorageAvailable()) {
          const now = new Date().getTime();
          localStorage.setItem(`hockeyData-${date}`, JSON.stringify(this.hockeyData));
          localStorage.setItem(`hockeyData-${date}-lastUpdated`, now.toString());
        }
      },
      error: (err) => {
        console.error('Error fetching hockey data', err);
      },
    });
  }

  toggleDatePicker(): void {
    this.showDatePicker = !this.showDatePicker;
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
    this.getHockeyData(this.selectedDate, true);
  }

  loadFromLocalStorage(): void {
    if (this.isLocalStorageAvailable()) {
      const savedDate = localStorage.getItem('selectedDate');
      if (savedDate) {
        this.selectedDate = savedDate;
        this.getHockeyData(this.selectedDate, true);
        return;
      }
    }
    this.getHockeyData(this.selectedDate, true);
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
    this.getHockeyData(this.selectedDate, true);
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
      case 'LIVE':
        return 'Jugando';
      case 'FT':
      case 'AOT': // After Over Time
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

  openModal(game: Game): void {
    this.selectedGame = game;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  toggleFavorite(game: Game, event: Event): void {
    event.stopPropagation();
    if (this.isFavorite(game.id)) {
      this.favoritesService.removeFavorite(game.id);
    } else {
      this.favoritesService.addFavorite(game);
    }
  }

  isFavorite(gameId: number): boolean {
    return this.favoritesService.isFavorite(gameId);
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
}
