import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../../interfaces/BasketballResponse';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal2',
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
      case '1Q':
      case '2Q':
      case '3Q':
      case '4Q':
      case 'OT':
      case 'BT':
      case 'HT':
      case 'LIVE':
        return 'Jugando';
      case 'FT':
      case 'AOT':
        return `${this.game.scores.home.total} - ${this.game.scores.away.total}`;
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
      'NS': 'No Empezado',
      '1Q': 'Primer Cuarto',
      '2Q': 'Segundo Cuarto',
      '3Q': 'Tercer Cuarto',
      '4Q': 'Cuarto Cuarto',
      'OT': 'Tiempo Extra',
      'BT': 'Tiempo de Descanso',
      'HT': 'Medio Tiempo',
      'FT': 'Partido Terminado',
      'AOT': 'Después de Tiempo Extra',
      'POST': 'Partido Aplazado',
      'CANC': 'Partido Cancelado',
      'SUSP': 'Partido Suspendido',
      'AWD': 'Partido Adjudicado',
      'ABD': 'Partido Abandonado',
      'LIVE': 'En Vivo',
      'Halftime': 'Medio Tiempo',
      'Quarter 1': 'Primer Cuarto',
      'Quarter 2': 'Segundo Cuarto',
      'Quarter 3': 'Tercer Cuarto',
      'Quarter 4': 'Cuarto Cuarto',
      'Over Time': 'Tiempo Extra',
      'Break Time': 'Tiempo de Descanso',
      'Game Finished': 'Partido Terminado',
      'After Over Time': 'Después de Tiempo Extra',
      'Game Postponed': 'Partido Aplazado',
      'Game Cancelled': 'Partido Cancelado',
      'Game Suspended': 'Partido Suspendido',
      'Game Awarded': 'Partido Adjudicado',
      'Game Abandoned': 'Partido Abandonado',
      'WalkOver': 'WalkOver'
    };
    return statusTranslations[status] || status;
  }
}
