import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Match } from '../../../interfaces/FootballResponse';

@Component({
  selector: 'app-match-timeline',
  templateUrl: './match-timeline.component.html',
  styleUrls: ['./match-timeline.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class MatchTimelineComponent implements OnInit {
  @Input() match: Match | null = null;

  constructor() { }

  ngOnInit(): void { }

  getEventIcon(event: any): string {
    switch (event.type) {
      case 'Goal':
        return '../../assets/images/futbol-americano.png'; // Ruta a tu ícono de gol
      case 'Card':
        return event.detail.includes('Yellow') ? 'assets/images/tarjeta-amarilla.png' : 'assets/images/rojo.png'; // Ruta a tus íconos de tarjetas
      case 'subst':
        return 'assets/images/cambiar.png'; // Ruta a tu ícono de sustitución
      default:
        return 'assets/images/default.png'; // Ruta a un ícono por defecto
    }
  }

  getEventDetail(event: any): string {
    switch (event.type) {
      case 'Goal':
        return `Gol de ${event.player.name}`;
      case 'Card':
        return event.detail.includes('Yellow') ? 'Tarjeta Amarilla a ' + event.player.name : 'Tarjeta Roja a ' + event.player.name;
      case 'subst':
        return `${event.player.name} in, ${event.assist?.name || 'unknown'} out`;
      default:
        return event.detail;
    }
  }
}