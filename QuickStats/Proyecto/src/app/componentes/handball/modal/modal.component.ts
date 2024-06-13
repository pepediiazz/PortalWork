import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandballGame } from '../../../interfaces/HandballResponse';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal7',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe]
})
export class ModalComponent implements OnInit {
  @Input() game: HandballGame | null = null;
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
    const homeScore = this.game.scores.home !== null ? this.game.scores.home : 0;
    const awayScore = this.game.scores.away !== null ? this.game.scores.away : 0;
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
        return `${this.game.scores.home} - ${this.game.scores.away}`;
      case 'POST':
      case 'CANC':
      case 'ABD':
      case 'AWD':
      case 'WO':
        return this.translateStatus(status);
      default:
        return gameDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }

  translateStatus(status: string): string {
    const statusTranslations: { [key: string]: string } = {
      'NS': 'No Empezado',
      '1H': 'Primer Tiempo',
      '2H': 'Segundo Tiempo',
      'HT': 'Medio Tiempo',
      'ET': 'Tiempo Extra',
      'BT': 'Tiempo de Descanso',
      'PT': 'Penaltis',
      'AW': 'Partido Adjudicado',
      'POST': 'Partido Aplazado',
      'CANC': 'Partido Cancelado',
      'INTR': 'Partido Interrumpido',
      'ABD': 'Partido Abandonado',
      'WO': 'Walkover',
      'AET': 'Después de Tiempo Extra',
      'AP': 'Después de Penaltis',
      'FT': 'Partido Terminado',
      'LIVE': 'En Vivo'
    };

    return statusTranslations[status] || status;
  }
}
