import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VolleyballGame } from '../../../interfaces/VolleyballResponse';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe]
})
export class ModalComponent implements OnInit {
  @Input() game: VolleyballGame | null = null;
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
      case '1S':
      case '2S':
      case '3S':
      case '4S':
      case '5S':
      case 'LIVE':
        return 'Jugando';
      case 'FT':
        return `${this.game.scores.home} - ${this.game.scores.away}`;
      case 'PST':
      case 'CANC':
      case 'ABD':
      case 'AWD':
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
}
