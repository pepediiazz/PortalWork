import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import localeEs from '@angular/common/locales/es';
import { FootbalService } from '../../../services/football.service';
import { FootbalResponse, Match } from '../../../interfaces/FootballResponse';
import { ModalComponent } from '../modal/modal.component';
import { FavoritesService } from '../../../services/favorites.service';

registerLocaleData(localeEs, 'es');

interface LeagueInfo {
  id: number;
  name: string;
  country: string;
  logo: string;
}

@Component({
  selector: 'app-ligas-populares',
  standalone: true,
  providers: [DatePipe],
  imports: [CommonModule, HttpClientModule, FormsModule, RouterModule, ModalComponent],
  templateUrl: './ligas-populares.component.html',
  styleUrls: ['./ligas-populares.component.css']
})
export class LigasPopularesComponent implements OnInit {
  ligaIds = [135, 39, 140, 71, 78, 61, 94, 88, 144, 128];
  leagues: LeagueInfo[] = [
    { id: 135, name: 'Serie A', country: "Italy", logo: 'https://media.api-sports.io/football/leagues/135.png' },
    { id: 39, name: 'Premier League', country: "England", logo: 'https://media.api-sports.io/football/leagues/39.png' },
    { id: 140, name: 'La Liga', country: "Spain", logo: 'https://media.api-sports.io/football/leagues/140.png' },
    { id: 71, name: 'Serie A', country: "Brazil", logo: 'https://media.api-sports.io/football/leagues/71.png' },
    { id: 78, name: 'Bundesliga', country: "Germany", logo: 'https://media.api-sports.io/football/leagues/78.png' },
    { id: 61, name: 'Ligue 1', country: "France", logo: 'https://media.api-sports.io/football/leagues/61.png' },
    { id: 94, name: 'Primeira Liga', country: "Portugal", logo: 'https://media.api-sports.io/football/leagues/94.png' },
    { id: 88, name: 'Eredivisie', country: "Netherlands", logo: 'https://media.api-sports.io/football/leagues/88.png' },
    { id: 144, name: 'Jupiler Pro League', country: "Belgium", logo: 'https://media.api-sports.io/football/leagues/144.png' },
    { id: 128, name: 'Liga Profesional Argentina', country: "Argentina", logo: 'https://media.api-sports.io/football/leagues/128.png' }
  ];
  footbalData: { [key: number]: Match[] } = {};
  selectedDate: string = new Date().toISOString().split('T')[0];
  showDatePicker: boolean = false;
  selectedMatch: Match | null = null;
  isModalVisible = false;

  constructor(private footbalService: FootbalService, private datePipe: DatePipe, private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.loadFromLocalStorage();
  }

  async getFootbalData(date: string): Promise<void> {
    if (this.isLocalStorageAvailable()) {
      const cachedData = localStorage.getItem(`footballData-${date}`);
      const lastUpdated = localStorage.getItem(`footballData-${date}-lastUpdated`);
      const now = new Date().getTime();
  
      if (cachedData && lastUpdated && (now - parseInt(lastUpdated, 10) < 5 * 60 * 1000)) {
        this.footbalData = JSON.parse(cachedData);
        return;
      }
    }
  
    try {
      const data: FootbalResponse | undefined = await this.footbalService.getFootbalByDate(date).toPromise();
      if (data && data.response) {
        this.footbalData = this.groupByLeague(this.filterLeagues(data.response));
        if (this.isLocalStorageAvailable()) {
          localStorage.setItem(`footballData-${date}`, JSON.stringify(this.footbalData));
          localStorage.setItem(`footballData-${date}-lastUpdated`, new Date().getTime().toString());
        }
      } else {
        console.error('No data returned from API');
      }
    } catch (err) {
      console.error('Error fetching football data', err);
    }
  }

  filterLeagues(matches: Match[]): Match[] {
    return matches.filter(match => this.ligaIds.includes(match.league.id));
  }

  groupByLeague(matches: Match[]): { [key: number]: Match[] } {
    return matches.reduce((acc, match) => {
      acc[match.league.id] = acc[match.league.id] || [];
      acc[match.league.id].push(match);
      return acc;
    }, {} as { [key: number]: Match[] });
  }

  onDateChange(event: any): void {
    const selectedDate = event.target.value;
    this.selectedDate = selectedDate;
    this.saveToLocalStorage('selectedDate', this.selectedDate);
    this.getFootbalData(this.selectedDate);
  }

  loadFromLocalStorage(): void {
    const savedDate = this.getFromLocalStorage('selectedDate');
    this.selectedDate = savedDate || this.selectedDate;
    this.getFootbalData(this.selectedDate);
  }

  isLocalStorageAvailable(): boolean {
    try {
      localStorage.setItem('__localStorageTest__', '__localStorageTest__');
      localStorage.removeItem('__localStorageTest__');
      return true;
    } catch {
      return false;
    }
  }

  changeDate(days: number): void {
    const currentDate = new Date(this.selectedDate);
    currentDate.setDate(currentDate.getDate() + days);
    this.selectedDate = currentDate.toISOString().split('T')[0];
    this.saveToLocalStorage('selectedDate', this.selectedDate);
    this.getFootbalData(this.selectedDate);
  }

  formatSelectedDate(): string {
    const date = new Date(this.selectedDate);
    const day = this.datePipe.transform(date, 'EEEE', '', 'es');
    const dayOfMonth = date.getDate();
    const month = this.datePipe.transform(date, 'MMMM', '', 'es');
    return `${day}, ${dayOfMonth} de ${month}`;
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

  toggleDatePicker(): void {
    this.showDatePicker = !this.showDatePicker;
  }

  openModal(match: Match): void {
    this.selectedMatch = match;
    this.isModalVisible = true;
    this.loadMatchDetails(match.fixture.id);
  }

  closeModal(): void {
    this.isModalVisible = false;
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

  private saveToLocalStorage(key: string, value: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, value);
    }
  }

  private getFromLocalStorage(key: string): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(key);
    }
    return null;
  }

  isFavorite(match: Match): boolean {
    return this.favoritesService.isFavorite(match.fixture.id);
  }

  toggleFavorite(match: Match): void {
    if (this.isFavorite(match)) {
      this.favoritesService.removeFavorite(match.fixture.id);
    } else {
      this.favoritesService.addFavorite(match);
    }
  }

  getLeagueInfo(leagueId: number): LeagueInfo | undefined {
    return this.leagues.find(league => league.id === leagueId);
  }
}
