import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseballService } from '../../../services/baseball.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-baseball-prediction-carousel',
  standalone: true,
  imports: [CommonModule],
  providers: [
    BaseballService,
    { provide: LOCALE_ID, useValue: 'es' }  // Configuramos el LOCALE_ID a 'es'
  ],
  templateUrl: './baseball-prediction-carousel.component.html',
  styleUrls: ['./baseball-prediction-carousel.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('hidden', style({
        opacity: 0,
        height: 0,
        overflow: 'hidden'
      })),
      state('visible', style({
        opacity: 1,
        height: '*'
      })),
      transition('hidden => visible', [
        animate('0.5s ease-in')
      ]),
      transition('visible => hidden', [
        animate('0.5s ease-out')
      ]),
    ])
  ]
})
export class BaseballPredictionCarouselComponent implements OnInit {
  matches: any[] = [];
  currentMatchIndex: number = 0;
  predictionResults: any;
  showPrediction: boolean = false;
  currentDate: string;

  constructor(private baseballService: BaseballService) {
    this.currentDate = this.getCurrentDate();
  }

  ngOnInit(): void {
    this.getMatches();
  }

  getCurrentDate(): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  getMatches(): void {
    this.baseballService.getBaseballByDate(this.currentDate).subscribe(data => {
      this.matches = data.response;
    }, error => {
      console.error('Error fetching matches:', error);
    });
  }

  prevMatch(): void {
    if (this.currentMatchIndex > 0) {
      this.currentMatchIndex--;
      this.resetPrediction();
    }
  }

  nextMatch(): void {
    if (this.currentMatchIndex < this.matches.length - 1) {
      this.currentMatchIndex++;
      this.resetPrediction();
    }
  }

  resetPrediction(): void {
    this.predictionResults = null;
    this.showPrediction = false;
  }

  predictOutcome(): void {
    const match = this.matches[this.currentMatchIndex];
    if (!match) {
      console.error('No match found for prediction');
      return;
    }

    const team1Id = match.teams.home.id;
    const team2Id = match.teams.away.id;

    if (!team1Id || !team2Id) {
      console.error('Team IDs are undefined');
      return;
    }

    this.baseballService.getHeadToHead(team1Id, team2Id).subscribe(data => {
      const headToHeadMatches = data.response;

      let team1Wins = 0;
      let draws = 0;
      let team2Wins = 0;

      headToHeadMatches.forEach((game: any) => {
        if (game.scores.home.total > game.scores.away.total) {
          team1Wins++;
        } else if (game.scores.home.total < game.scores.away.total) {
          team2Wins++;
        } else {
          draws++;
        }
      });

      const totalGames = headToHeadMatches.length;
      this.predictionResults = {
        team1: ((team1Wins / totalGames) * 100).toFixed(2),
        draw: ((draws / totalGames) * 100).toFixed(2),
        team2: ((team2Wins / totalGames) * 100).toFixed(2)
      };

      setTimeout(() => this.showPrediction = true, 500); // Espera 500ms antes de mostrar la predicción
    }, error => {
      console.error('Error fetching head-to-head data:', error);
    });
  }

  parsePercentage(value: string): number {
    return parseInt(value, 10);
  }
}
