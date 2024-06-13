import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HandballService } from '../../../services/handball.service';
import { HandballGame } from '../../../interfaces/HandballResponse';
import { ModalComponent } from '../modal/modal.component';
import { RouterModule } from '@angular/router';
import { FavoritesHandballService } from '../../../services/favorites-handball.service';

interface LeagueInfo {
  id: number;
  name: string;
  country: string;
  logo: string;
}

@Component({
  selector: 'app-ligas-populares-handball',
  standalone: true,
  imports: [CommonModule, ModalComponent, RouterModule],
  templateUrl: './ligas-populares-handball.component.html',
  styleUrls: ['./ligas-populares-handball.component.css'],
  providers: [DatePipe]
})
export class LigasPopularesHandballComponent implements OnInit {
  ligaIds = [39, 34, 103, 75, 15, 78, 49, 136, 87, 91]; // IDs de ligas populares de balonmano
  leagues: LeagueInfo[] = [
    { id: 39, name: 'Bundesliga', country: 'Germany', logo: 'https://media.api-sports.io/handball/leagues/39.png' },
    { id: 34, name: 'Starligue', country: 'France', logo: 'https://media.api-sports.io/handball/leagues/34.png' },
    { id: 103, name: 'Liga ASOBAL', country: 'Spain', logo: 'https://media.api-sports.io/handball/leagues/103.png' },
    { id: 75, name: 'REMA 1000-ligaen', country: 'Norway', logo: 'https://media.api-sports.io/handball/leagues/75.png' },
    { id: 15, name: '1. Division', country: 'Denmark', logo: 'https://media.api-sports.io/handball/leagues/15.png' },
    { id: 78, name: 'Superliga', country: 'Poland', logo: 'https://media.api-sports.io/handball/leagues/78.png' },
    { id: 49, name: 'NB I', country: 'Hungary', logo: 'https://media.api-sports.io/handball/leagues/49.png' },
    { id: 136, name: 'SEHA Liga', country: 'Europe', logo: 'https://media.api-sports.io/handball/leagues/136.png' },
    { id: 87, name: 'Liga Nationala', country: 'Romania', logo: 'https://media.api-sports.io/handball/leagues/87.png' },
    { id: 91, name: 'Superleague', country: 'Russia', logo: 'https://media.api-sports.io/handball/leagues/91.png' }
  ];
  handballData: { [key: number]: HandballGame[] } = {};
  selectedDate: string = new Date().toISOString().split('T')[0];
  showDatePicker: boolean = false;
  selectedGame: HandballGame | null = null;
  isModalVisible = false;

  private updateInterval = 5 * 60 * 1000; // 5 minutos en milisegundos

  constructor(
    private handballService: HandballService,
    private datePipe: DatePipe,
    private favoritesService: FavoritesHandballService
  ) {}

  ngOnInit(): void {
    this.loadFromLocalStorage();
  }

  getHandballData(date: string, forceUpdate: boolean = false): void {
    if (this.isLocalStorageAvailable() && !forceUpdate) {
      const cachedData = localStorage.getItem(`handballData-${date}`);
      const lastUpdated = localStorage.getItem(`handballData-${date}-lastUpdated`);
      const now = new Date().getTime();

      if (cachedData && lastUpdated) {
        const lastUpdatedTime = parseInt(lastUpdated, 10);
        if (now - lastUpdatedTime < this.updateInterval) {
          this.handballData = JSON.parse(cachedData);
          return;
        }
      }
    }

    this.handballService.getHandballByDate(date).subscribe({
      next: (data) => {
        this.handballData = this.groupByLeague(this.filterLeagues(data.response));
        if (this.isLocalStorageAvailable()) {
          const now = new Date().getTime();
          localStorage.setItem(`handballData-${date}`, JSON.stringify(this.handballData));
          localStorage.setItem(`handballData-${date}-lastUpdated`, now.toString());
        }
      },
      error: (err) => {
        console.error('Error fetching handball data', err);
      },
    });
  }

  filterLeagues(games: HandballGame[]): HandballGame[] {
    return games.filter(game => this.ligaIds.includes(game.league.id));
  }

  groupByLeague(games: HandballGame[]): { [key: number]: HandballGame[] } {
    return games.reduce((acc, game) => {
      if (!acc[game.league.id]) {
        acc[game.league.id] = [];
      }
      acc[game.league.id].push(game);
      return acc;
    }, {} as { [key: number]: HandballGame[] });
  }

  onDateChange(event: any): void {
    const selectedDate = event.target.value;
    this.selectedDate = selectedDate;
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('selectedDate', this.selectedDate);
    }
    this.getHandballData(this.selectedDate, true);
  }

  loadFromLocalStorage(): void {
    if (this.isLocalStorageAvailable()) {
      const savedDate = localStorage.getItem('selectedDate');
      if (savedDate) {
        this.selectedDate = savedDate;
        this.getHandballData(this.selectedDate, true);
        return;
      }
    }
    this.getHandballData(this.selectedDate, true);
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
    this.getHandballData(this.selectedDate, true);
  }

  formatSelectedDate(): string {
    const date = new Date(this.selectedDate);
    const day = this.datePipe.transform(date, 'EEEE', '', 'es');
    const dayOfMonth = date.getDate();
    const month = this.datePipe.transform(date, 'MMMM', '', 'es');
    return `${day}, ${dayOfMonth} de ${month}`;
  }

  getStatusOrScore(game: HandballGame): string {
    const status = game.status.short;
    const gameDate = new Date(game.date);

    switch (status) {
      case 'NS':
        return this.datePipe.transform(gameDate, 'HH:mm', '', 'es') ?? 'Hora desconocida';
      case 'LIVE':
      case '1H':
      case '2H':
      case 'HT':
      case 'ET':
      case 'BT':
      case 'PT':
        return 'Jugando';
      case 'FT':
      case 'AET':
      case 'AP':
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

  openModal(game: HandballGame): void {
    this.selectedGame = game;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  toggleDatePicker(): void {
    this.showDatePicker = !this.showDatePicker;
  }

  toggleFavorite(game: HandballGame, event: Event): void {
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
    const statusTranslations: { [key: string]: { long: string, short: string } } = {
      'NS': { long: 'No Empezado', short: 'NS' },
      '1H': { long: 'Primer Tiempo (En Juego)', short: '1H' },
      '2H': { long: 'Segundo Tiempo (En Juego)', short: '2H' },
      'HT': { long: 'Medio Tiempo (En Juego)', short: 'HT' },
      'ET': { long: 'Tiempo Extra (En Juego)', short: 'ET' },
      'BT': { long: 'Tiempo de Descanso (En Juego)', short: 'BT' },
      'PT': { long: 'Penaltis (En Juego)', short: 'PT' },
      'AW': { long: 'Partido Adjudicado', short: 'AW' },
      'POST': { long: 'Partido Aplazado', short: 'POST' },
      'CANC': { long: 'Partido Cancelado', short: 'CANC' },
      'INTR': { long: 'Partido Interrumpido', short: 'INTR' },
      'ABD': { long: 'Partido Abandonado', short: 'ABD' },
      'WO': { long: 'Walkover', short: 'WO' },
      'AET': { long: 'Después de Tiempo Extra (Partido Terminado)', short: 'AET' },
      'AP': { long: 'Después de Penaltis (Partido Terminado)', short: 'AP' },
      'FT': { long: 'Partido Terminado (Juego Terminado)', short: 'FT' }
    };

    return statusTranslations[status]?.long || status;
  }

  getLeagueInfo(leagueId: number): LeagueInfo | undefined {
    return this.leagues.find(league => league.id === leagueId);
  }
}
