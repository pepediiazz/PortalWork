import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HandballService } from '../../../services/handball.service';
import { HandballGame } from '../../../interfaces/HandballResponse';
import localeEs from '@angular/common/locales/es';
import { trigger, state, style, transition, animate } from '@angular/animations';

registerLocaleData(localeEs);

@Component({
  selector: 'app-handball-carousel',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [
    HandballService,
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  templateUrl: './handball-carousel.component.html',
  styleUrls: ['./handball-carousel.component.css'],
  animations: [
    trigger('slideInOut', [
      state('void', style({ position: 'absolute', width: '100%' })),
      state('left', style({ transform: 'translateX(-100%)' })),
      state('center', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(100%)' })),
      transition('center => left', [
        animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
      ]),
      transition('center => right', [
        animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
      ]),
      transition('void => right', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s ease-in-out')
      ]),
      transition('void => left', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-in-out')
      ])
    ])
  ]
})
export class HandballCarouselComponent implements OnInit {
  games: HandballGame[] = [];
  currentGameIndex: number = 0;
  currentDate: Date = new Date();
  animationState: string = 'center';

  constructor(private handballService: HandballService) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    const today = this.currentDate.toISOString().split('T')[0];
    this.handballService.getHandballByDate(today).subscribe(
      data => {
        if (data.errors.length > 0) {
          console.error('API Errors:', data.errors);
          return;
        }
        const now = new Date();
        const newGames = data.response.filter(game => new Date(game.date) > now);
        if (newGames.length > 0) {
          this.games = newGames;
        } else {
          this.incrementDateAndFetchGames();
        }
      },
      error => {
        console.error('Error fetching games', error);
      }
    );
  }

  incrementDateAndFetchGames(): void {
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.getGames();
  }

  prevGame(): void {
    if (this.currentGameIndex > 0) {
      this.animationState = 'left';
      setTimeout(() => {
        this.currentGameIndex--;
        this.animationState = 'center';
      }, 500); // Duración de la animación
    }
  }

  nextGame(): void {
    if (this.currentGameIndex < this.games.length - 1) {
      this.animationState = 'right';
      setTimeout(() => {
        this.currentGameIndex++;
        this.animationState = 'center';
      }, 500); // Duración de la animación
    } else {
      this.incrementDateAndFetchGames();
      this.animationState = 'right';
      setTimeout(() => {
        if (this.currentGameIndex < this.games.length - 1) {
          this.currentGameIndex++;
        }
        this.animationState = 'center';
      }, 500); // Duración de la animación
    }
  }
}
