import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandballService } from '../../../services/handball.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-handball-prediction-carousel',
  standalone: true,
  imports: [CommonModule],
  providers: [
    HandballService,
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  templateUrl: './handball-prediction-carousel.component.html',
  styleUrls: ['./handball-prediction-carousel.component.css'],
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
export class HandballPredictionCarouselComponent implements OnInit {
  matches: any[] = [];
  currentMatchIndex: number = 0;
  predictionResults: any;
  showPrediction: boolean = false;
  currentDate: Date;

  constructor(private handballService: HandballService) {
    this.currentDate = new Date();
  }

  ngOnInit(): void {
    this.getMatches();
  }

  getCurrentDate(): string {
    const yyyy = this.currentDate.getFullYear();
    const mm = String(this.currentDate.getMonth() + 1).padStart(2, '0');
    const dd = String(this.currentDate.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  getMatches(): void {
    const formattedDate = this.getCurrentDate();
    this.handballService.getHandballByDate(formattedDate).subscribe(data => {
      this.matches = data.response;
      if (this.matches.length === 0) {
        // Si no hay partidos, busca en el siguiente día
        this.currentDate.setDate(this.currentDate.getDate() + 1);
        this.getMatches();
      } else {
        this.resetPrediction();
      }
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

    this.handballService.getHeadToHead(team1Id, team2Id).subscribe(data => {
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

      setTimeout(() => this.showPrediction = true, 500);
    }, error => {
      console.error('Error fetching head-to-head data:', error);
    });
  }

  parsePercentage(value: string): number {
    return parseInt(value, 10);
  }
}
