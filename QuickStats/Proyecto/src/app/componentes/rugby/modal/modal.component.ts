import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Game } from '../../../interfaces/RugbyResponse';

@Component({
  selector: 'app-modal-rugby',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe]
})
export class ModalRugbyComponent implements OnInit {
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
    const homeScore = this.game.scores.home ?? 0;
    const awayScore = this.game.scores.away ?? 0;
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
      case '1H':
      case '2H':
      case 'HT':
      case 'ET':
      case 'BT':
      case 'PT':
      case 'LIVE':
        return 'Jugando';
      case 'FT':
      case 'AET': // After Extra Time
        return `${this.game.scores.home} - ${this.game.scores.away}`;
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
      'First Half': 'Primer Tiempo',
      'Second Half': 'Segundo Tiempo',
      'Half Time': 'Medio Tiempo',
      'Extra Time': 'Tiempo Extra',
      'Break Time': 'Tiempo de Descanso',
      'Penalties Time': 'Penaltis',
      'Awarded': 'Adjudicado',
      'Postponed': 'Aplazado',
      'Cancelled': 'Cancelado',
      'Interrupted': 'Interrumpido',
      'Abandoned': 'Abandonado',
      'After Extra Time': 'Después de Tiempo Extra',
      'Finished': 'Terminado',
      'WalkOver': 'WalkOver',
      'LIVE': 'En Vivo'
    };
    return statusTranslations[status] || status;
  }

  getPeriodScores(): { period: string, score: string }[] {
    if (!this.game || !this.game.periods) {
      return [];
    }

    const periods = this.game.periods;
    const periodScores: { period: string, score: string }[] = [
      { period: 'Primer Tiempo', score: periods.first ? `${periods.first.home} - ${periods.first.away}` : '' },
      { period: 'Segundo Tiempo', score: periods.second ? `${periods.second.home} - ${periods.second.away}` : '' },
      { period: 'Tercer Tiempo', score: periods.third ? `${periods.third.home} - ${periods.third.away}` : '' },
      { period: 'Prórroga', score: periods.overtime ? `${periods.overtime.home} - ${periods.overtime.away}` : '' },
      { period: 'Penaltis', score: periods.penalties ? `${periods.penalties.home} - ${periods.penalties.away}` : '' }
    ];

    return periodScores.filter(period => period.score !== '');
  }
}
