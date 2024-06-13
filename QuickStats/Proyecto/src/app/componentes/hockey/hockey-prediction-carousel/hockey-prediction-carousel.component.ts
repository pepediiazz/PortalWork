import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HockeyService } from '../../../services/hockey.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-hockey-prediction-carousel',
  standalone: true,
  imports: [CommonModule],
  providers: [
    HockeyService,
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  templateUrl: './hockey-prediction-carousel.component.html',
  styleUrls: ['./hockey-prediction-carousel.component.css'],
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
export class HockeyPredictionCarouselComponent implements OnInit {
  matches: any[] = [];
  currentMatchIndex: number = 0;
  predictionResults: any;
  showPrediction: boolean = false;
  currentDate: Date = new Date();

  constructor(private hockeyService: HockeyService) {}

  ngOnInit(): void {
    this.getMatches();
  }

  getMatches(): void {
    const today = this.currentDate.toISOString().split('T')[0];
    this.hockeyService.getHockeyByDate(today).subscribe(
      data => {
        if (data.errors.length > 0) {
          console.error('API Errors:', data.errors);
          return;
        }
        const now = new Date();
        const newMatches = data.response.filter(game => new Date(game.date) > now);
        if (newMatches.length > 0) {
          this.matches = [...this.matches, ...newMatches];
        } else {
          this.incrementDateAndFetchMatches();
        }
        console.log('Matches:', this.matches);
      },
      error => {
        console.error('Error fetching matches', error);
      }
    );
  }

  incrementDateAndFetchMatches(): void {
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.getMatches();
  }

  prevMatch(): void {
    if (this.currentMatchIndex > 0) {
      this.currentMatchIndex--;
      this.resetPrediction();
    }
    console.log('Current Match Index (prev):', this.currentMatchIndex);
  }

  nextMatch(): void {
    if (this.currentMatchIndex < this.matches.length - 1) {
      this.currentMatchIndex++;
      this.resetPrediction();
    } else {
      this.incrementDateAndFetchMatches();
    }
    console.log('Current Match Index (next):', this.currentMatchIndex);
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

    console.log('Predicting outcome for match:', match);
    console.log('Team 1 ID:', team1Id);
    console.log('Team 2 ID:', team2Id);

    this.hockeyService.getHeadToHead(team1Id, team2Id).subscribe(data => {
      const headToHeadMatches = data.response;

      let team1Wins = 0;
      let draws = 0;
      let team2Wins = 0;

      console.log('Head-to-head data:', headToHeadMatches);

      if (headToHeadMatches && headToHeadMatches.length > 0) {
        headToHeadMatches.forEach((game: any) => {
          if (game.scores.home > game.scores.away) {
            team1Wins++;
          } else if (game.scores.home < game.scores.away) {
            team2Wins++;
          } else {
            draws++;
          }
        });
      } else {
        console.log('No head-to-head data available.');
      }

      const totalGames = headToHeadMatches.length;

      console.log('Total Games:', totalGames);
      console.log('Team 1 Wins:', team1Wins);
      console.log('Draws:', draws);
      console.log('Team 2 Wins:', team2Wins);

      if (totalGames > 0) {
        this.predictionResults = {
          team1: ((team1Wins / totalGames) * 100).toFixed(2),
          draw: ((draws / totalGames) * 100).toFixed(2),
          team2: ((team2Wins / totalGames) * 100).toFixed(2)
        };
      } else {
        this.predictionResults = {
          team1: '0.00',
          draw: '0.00',
          team2: '0.00'
        };
      }

      console.log('Prediction Results:', this.predictionResults);

      setTimeout(() => this.showPrediction = true, 500);
    }, error => {
      console.error('Error fetching head-to-head data:', error);
    });
  }

  parsePercentage(value: string): number {
    return isNaN(parseInt(value, 10)) ? 0 : parseInt(value, 10);
  }
}
