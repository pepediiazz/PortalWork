import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FootballFeatureService } from '../../../services/football-feature.service';
import { Match } from '../../../interfaces/FootballResponse';
import localeEs from '@angular/common/locales/es';
import { trigger, state, style, transition, animate } from '@angular/animations';

registerLocaleData(localeEs);

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [
    FootballFeatureService,
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('slideInOut', [
      state('void', style({ position: 'absolute', width: '100%' })),
      state('left', style({ transform: 'translateX(-100%)' })),
      state('center', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(100%)' })),
      transition('center => left', [
        animate('0.3s ease-in-out', style({ transform: 'translateX(100%)' }))
      ]),
      transition('center => right', [
        animate('0.3s ease-in-out', style({ transform: 'translateX(-100%)' }))
      ]),
      transition('void => right', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.3s ease-in-out')
      ]),
      transition('void => left', [
        style({ transform: 'translateX(100%)' }),
        animate('0.3s ease-in-out')
      ])
    ])
  ]
})
export class CarouselComponent implements OnInit {
  matches: Match[] = [];
  currentMatchIndex: number = 0;
  fixturesCount: number = 50; // Initial number of fixtures to fetch
  animationState: string = 'center';

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
      this.animationState = 'left';
      setTimeout(() => {
        this.currentMatchIndex--;
        this.animationState = 'center';
      }, 500);
    }
  }

  nextMatch(): void {
    if (this.currentMatchIndex < this.matches.length - 1) {
      this.animationState = 'right';
      setTimeout(() => {
        this.currentMatchIndex++;
        this.animationState = 'center';
      }, 500);
    } else {
      // Si se llega al final de los partidos actuales, obtener más partidos
      this.fixturesCount += 50; // Incrementar el número de partidos a obtener
      this.getMatches();
      this.animationState = 'right';
      setTimeout(() => {
        this.currentMatchIndex++;
        this.animationState = 'center';
      }, 500);
    }
  }
}
