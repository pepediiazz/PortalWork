import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../../interfaces/HockeyResponse';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-hockey',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe]
})
export class ModalHockeyComponent implements OnInit {
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
      'LIVE': 'En Vivo',
      'Finished': 'Partido Terminado',
      'Postponed': 'Partido Aplazado',
      'Cancelled': 'Partido Cancelado',
      'Interrupted': 'Partido Interrumpido',
      'Abandoned': 'Partido Abandonado',
      'Awarded': 'Partido Adjudicado',
      'WalkOver': 'WalkOver',
      'After Over Time': 'Después de Tiempo Extra',
      'NS': 'No Empezado',
      '1P': 'Primer Periodo',
      '2P': 'Segundo Periodo',
      '3P': 'Tercer Periodo',
      'OT': 'Prórroga',
      'SO': 'Penaltis'
    };
    return statusTranslations[status] || status;
  }

  getPeriodScores(): { period: string, score: string }[] {
    if (!this.game || !this.game.periods) {
      return [];
    }

    const periods = this.game.periods;
    const periodScores: { period: string, score: string }[] = [
      { period: 'Primer Periodo', score: periods.first ?? '-' },
      { period: 'Segundo Periodo', score: periods.second ?? '-' },
      { period: 'Tercer Periodo', score: periods.third ?? '-' },
      { period: 'Prórroga', score: periods.overtime ?? '-' },
      { period: 'Penaltis', score: periods.penalties ?? '-' }
    ];

    return periodScores;
  }
}
