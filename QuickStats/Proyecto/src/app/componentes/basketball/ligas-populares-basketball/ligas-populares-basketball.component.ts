import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import localeEs from '@angular/common/locales/es';
import { BasketballService } from '../../../services/basketball.service';
import { BasketballResponse, Game } from '../../../interfaces/BasketballResponse';
import { ModalComponent } from '../modal/modal.component';
import { BasketballFavoritesService } from '../../../services/favorites-basketball.service';

registerLocaleData(localeEs, 'es');

interface LeagueInfo {
  id: number;
  name: string;
  country: string;
  logo: string;
}

@Component({
  selector: 'app-ligas-populares-basketball',
  standalone: true,
  providers: [DatePipe],
  imports: [RouterModule, CommonModule, HttpClientModule, FormsModule, ModalComponent],
  templateUrl: './ligas-populares-basketball.component.html',
  styleUrls: ['./ligas-populares-basketball.component.css']
})
export class LigasPopularesBasketballComponent implements OnInit {
  constructor(private basketballService: BasketballService, private datePipe: DatePipe, private favoritesService: BasketballFavoritesService) {}

  ligaIds = [12, 87, 117, 219, 216, 200, 95, 92, 89, 256];
  leagues: LeagueInfo[] = [
    { id: 12, name: 'NBA', country: 'USA', logo: 'https://media.api-sports.io/basketball/leagues/12.png' },
    { id: 87, name: 'Euroleague', country: 'Europe', logo: 'https://media.api-sports.io/basketball/leagues/87.png' },
    { id: 117, name: 'ACB', country: 'Spain', logo: 'https://media.api-sports.io/basketball/leagues/117.png' },
    { id: 219, name: 'CBA', country: 'China', logo: 'https://media.api-sports.io/basketball/leagues/219.png' },
    { id: 216, name: 'VTB United League', country: 'Russia', logo: 'https://media.api-sports.io/basketball/leagues/216.png' },
    { id: 200, name: 'BSL', country: 'Turkey', logo: 'https://media.api-sports.io/basketball/leagues/200.png' },
    { id: 95, name: 'BBL', country: 'Germany', logo: 'https://media.api-sports.io/basketball/leagues/95.png' },
    { id: 92, name: 'LNB', country: 'France', logo: 'https://media.api-sports.io/basketball/leagues/92.png' },
    { id: 89, name: 'Lega Basket Serie A', country: 'Italy', logo: 'https://media.api-sports.io/basketball/leagues/89.png' },
    { id: 256, name: 'Liga Nacional', country: 'Argentina', logo: 'https://media.api-sports.io/basketball/leagues/256.png' }
  ];
  basketballData: { [key: number]: Game[] } = {};
  selectedDate: string = new Date().toISOString().split('T')[0];
  showDatePicker: boolean = false;
  selectedGame: Game | null = null;
  isModalVisible = false;

  ngOnInit(): void {
    this.loadFromLocalStorage();
  }

  getBasketballData(date: string, forceUpdate: boolean = false): void {
    if (this.isLocalStorageAvailable() && !forceUpdate) {
      const cachedData = localStorage.getItem(`basketballData-${date}`);
      const lastUpdated = localStorage.getItem(`basketballData-${date}-lastUpdated`);
      const now = new Date().getTime();
      const updateInterval = 5 * 60 * 1000; // 5 minutos en milisegundos

      if (cachedData && lastUpdated) {
        const lastUpdatedTime = parseInt(lastUpdated, 10);
        if (now - lastUpdatedTime < updateInterval) {
          this.basketballData = JSON.parse(cachedData);
          return;
        }
      }
    }

    this.basketballService.getBasketballByDate(date).subscribe({
      next: (data) => {
        this.basketballData = this.groupByLeague(this.filterLeagues(data.response));
        if (this.isLocalStorageAvailable()) {
          const now = new Date().getTime();
          localStorage.setItem(`basketballData-${date}`, JSON.stringify(this.basketballData));
          localStorage.setItem(`basketballData-${date}-lastUpdated`, now.toString());
        }
      },
      error: (err) => {
        console.error('Error fetching basketball data', err);
      },
    });
  }

  filterLeagues(games: Game[]): Game[] {
    return games.filter(game => this.ligaIds.includes(game.league.id));
  }

  toggleDatePicker(): void {
    this.showDatePicker = !this.showDatePicker;
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
    this.getBasketballData(this.selectedDate, true);
  }

  loadFromLocalStorage(): void {
    if (this.isLocalStorageAvailable()) {
      const savedDate = localStorage.getItem('selectedDate');
      if (savedDate) {
        this.selectedDate = savedDate;
        this.getBasketballData(this.selectedDate, true);
        return;
      }
    }
    this.getBasketballData(this.selectedDate, true);
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
    this.getBasketballData(this.selectedDate, true);
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

  openModal(game: Game): void {
    this.selectedGame = game;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
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
