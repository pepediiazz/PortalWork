import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../../interfaces/BaseballResponse';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal3',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe]
})
export class ModalComponent implements OnInit {
  @Input() game: Game | null = null;
  @Input() visible = false;
  @Output() closeModal = new EventEmitter<void>();

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {}

  close(): void {
    this.closeModal.emit();
    this.visible = false;
  }

  getCurrentScore(): string {
    if (!this.game) {
      return '';
    }
    const homeScore = this.game.scores.home.total !== null ? this.game.scores.home.total : 0;
    const awayScore = this.game.scores.away.total !== null ? this.game.scores.away.total : 0;
    return `${homeScore} - ${awayScore}`;
  }

  getStatusOrScore(): string {
    if (!this.game) {
      return '';
    }

    const status = this.game.status.short;
    const gameDate = new Date(this.game.date);
    switch (status) {
      case 'NS':
        return gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case 'LIVE':
        return 'Jugando';
      case 'FT':
        return `${this.game.scores.home.total} - ${this.game.scores.away.total}`;
      case 'POST':
      case 'CANC':
      case 'SUSP':
      case 'AWD':
      case 'ABD':
      case 'WO':
        return this.translateStatus(this.game.status.long);
      default:
        return gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }

  translateStatus(status: string): string {
    const statusTranslations: { [key: string]: string } = {
      'Not Started': 'No Empezado',
      'LIVE': 'En Vivo',
      'Finished': 'Partido Terminado',
      'Postponed': 'Partido Aplazado',
      'Cancelled': 'Partido Cancelado',
      'Suspended': 'Partido Suspendido',
      'Awarded': 'Partido Adjudicado',
      'Abandoned': 'Partido Abandonado',
      'WalkOver': 'WalkOver'
    };
    return statusTranslations[status] || status;
  }

  getInningScores(): { inning: string, home: number | null, away: number | null }[] {
    if (!this.game) {
      return [];
    }

    const homeInnings = this.game.scores.home.innings ?? {};
    const awayInnings = this.game.scores.away.innings ?? {};

    const innings: { inning: string, home: number | null, away: number | null }[] = [];
    const maxInnings = Math.max(Object.keys(homeInnings).length, Object.keys(awayInnings).length);

    for (let i = 1; i <= maxInnings; i++) {
      const inningKey = i === 10 ? 'extra' : i.toString();
      innings.push({
        inning: inningKey,
        home: homeInnings[inningKey as keyof typeof homeInnings] !== undefined ? homeInnings[inningKey as keyof typeof homeInnings] : null,
        away: awayInnings[inningKey as keyof typeof awayInnings] !== undefined ? awayInnings[inningKey as keyof typeof awayInnings] : null
      });
    }

    return innings;
  }
}
