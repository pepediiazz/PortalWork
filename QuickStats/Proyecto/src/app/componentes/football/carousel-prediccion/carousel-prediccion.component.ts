import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FootballFeatureService } from '../../../services/football-feature.service';
import { Match } from '../../../interfaces/FootballResponse';
import localeEs from '@angular/common/locales/es';
import { trigger, state, style, transition, animate } from '@angular/animations';

registerLocaleData(localeEs);

@Component({
  selector: 'app-carousel-prediccion',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [
    FootballFeatureService,
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  templateUrl: './carousel-prediccion.component.html',
  styleUrls: ['./carousel-prediccion.component.css'],
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
export class CarouselPrediccionComponent implements OnInit {
  matches: Match[] = [];
  currentMatchIndex: number = 0;
  fixturesCount: number = 50; // Initial number of fixtures to fetch
  predictionResults: any;
  showPrediction: boolean = false;

  constructor(private footballFeatureService: FootballFeatureService) { }

  ngOnInit(): void {
    this.getMatches();
  }

  getMatches(): void {
    this.footballFeatureService.getNextFixtures(this.fixturesCount).subscribe(
      data => {
        if (data.errors.length > 0) {
          console.error('API Errors:', data.errors);
          return;
        }
        const now = new Date();
        const newMatches = data.response.filter(match => new Date(match.fixture.date) > now);
        this.matches = [...this.matches, ...newMatches];
      },
      error => {
        console.error('Error fetching matches', error);
      }
    );
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
    } else {
      this.fixturesCount += 50;
      this.getMatches();
      this.resetPrediction();
    }
  }

  resetPrediction(): void {
    this.predictionResults = null;
    this.showPrediction = false;
  }

  predictOutcome(fixtureId: number, prediction: string): void {
    this.showPrediction = false;  // Ocultar la predicción actual
    this.footballFeatureService.getPredictions(fixtureId).subscribe(
      data => {
        console.log('Prediction Data:', data);  // Verificar la estructura de los datos
        if (data && data.response && data.response.length > 0) {
          this.predictionResults = data.response[0].predictions.percent;
          setTimeout(() => this.showPrediction = true, 500); // Espera 500ms antes de mostrar la gráfica
        } else {
          console.error('No prediction data available');
          this.predictionResults = null;
        }
      },
      error => {
        console.error('Error fetching prediction data', error);
        this.predictionResults = null;
      }
    );
  }

  parsePercentage(value: string): number {
    return parseInt(value, 10);
  }
}
