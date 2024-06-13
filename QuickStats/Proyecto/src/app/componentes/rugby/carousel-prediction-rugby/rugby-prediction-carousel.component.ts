import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RugbyService } from '../../../services/rugby.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { RugbyResponse, Game } from '../../../interfaces/RugbyResponse';

@Component({
  selector: 'app-rugby-prediction-carousel',
  standalone: true,
  imports: [CommonModule],
  providers: [
    RugbyService,
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  templateUrl: './rugby-prediction-carousel.component.html',
  styleUrls: ['./rugby-prediction-carousel.component.css'],
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
export class RugbyPredictionCarouselComponent implements OnInit {
  matches: Game[] = [];
  currentMatchIndex: number = 0;
  predictionResults: any;
  showPrediction: boolean = false;
  currentDate: string;

  constructor(private rugbyService: RugbyService) {
    this.currentDate = this.getCurrentDate();
  }

  ngOnInit(): void {
    console.log('RugbyPredictionCarouselComponent initialized');
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
    console.log('Fetching matches for date:', this.currentDate);
    this.rugbyService.getRugbyByDate(this.currentDate).subscribe(data => {
      console.log('Rugby data received:', data);
      this.matches = data.response;
      console.log('Processed matches:', this.matches);
      if (this.matches.length === 0) {
        this.incrementDateAndFetchMatches();
      }
    }, error => {
      console.error('Error fetching matches:', error);
    });
  }

  incrementDateAndFetchMatches(): void {
    const nextDate = new Date(this.currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    this.currentDate = this.formatDate(nextDate);
    this.getMatches();
  }

  formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
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

    const team1Id = match.teams?.home?.id;
    const team2Id = match.teams?.away?.id;

    if (!team1Id || !team2Id) {
      console.error('Team IDs are undefined');
      return;
    }

    console.log(`Predicting outcome for match: ${team1Id} vs ${team2Id}`);

    this.rugbyService.getHeadToHead(team1Id, team2Id).subscribe(data => {
      console.log('Head-to-head data:', data);
      const headToHeadMatches = data.response;

      let team1Wins = 0;
      let draws = 0;
      let team2Wins = 0;

      headToHeadMatches.forEach((game: any) => {
        if (game.scores.home > game.scores.away) {
          team1Wins++;
        } else if (game.scores.home < game.scores.away) {
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

      console.log('Prediction results:', this.predictionResults);

      setTimeout(() => this.showPrediction = true, 500);
    }, error => {
      console.error('Error fetching head-to-head data:', error);
    });
  }

  parsePercentage(value: string): number {
    return parseInt(value, 10);
  }
}
