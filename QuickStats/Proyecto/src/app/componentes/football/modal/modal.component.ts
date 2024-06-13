import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Match } from '../../../interfaces/FootballResponse';
import { MatchStatsComponent } from '../match-stats/match-stats.component';
import { MatchTimelineComponent } from '../match-timeline/match-timeline.component';
import { MatchPossessionComponent } from '../match-possession/match-possession.component';
import { LineupComponent } from '../lineup/lineup.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true,
  imports: [CommonModule, MatchStatsComponent, MatchTimelineComponent, MatchPossessionComponent, LineupComponent]
})
export class ModalComponent implements OnInit {
  @Input() match: Match | null = null;
  @Input() visible = false;
  @Output() closeModal = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  close(): void {
    this.closeModal.emit();
    this.visible = false;
  }

  getCurrentScore(): string {
    if (!this.match) {
      return '';
    }
    const homeGoals = this.match.goals.home !== null ? this.match.goals.home : 0;
    const awayGoals = this.match.goals.away !== null ? this.match.goals.away : 0;
    return `${homeGoals} - ${awayGoals}`;
  }

  getStatusOrScore(): string {
    if (!this.match) {
      return '';
    }

    const status = this.match.fixture.status.short;
    const fixtureDate = new Date(this.match.fixture.date);
    switch (status) {
      case 'TBD':
      case 'NS':
        return fixtureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case '1H':
      case 'HT':
      case '2H':
      case 'ET':
      case 'BT':
      case 'P':
      case 'SUSP':
      case 'INT':
      case 'LIVE':
        return 'Jugando';
      case 'FT':
      case 'AET':
      case 'PEN':
        return `${this.match.goals.home} - ${this.match.goals.away}`;
      case 'PST':
      case 'CANC':
      case 'ABD':
      case 'AWD':
      case 'WO':
        return this.translateStatus(this.match.fixture.status.long);
      default:
        return fixtureDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  }

  translateStatus(status: string): string {
    const statusTranslations: { [key: string]: string } = {
      'Time To Be Defined': 'Hora por definir',
      'Not Started': 'No Empezado',
      'First Half': 'Primera mitad',
      'Halftime': 'Medio Tiempo',
      'Second Half': 'Segunda mitad',
      'Extra Time': 'Tiempo Extra',
      'Break Time': 'Descanso',
      'Penalty In Progress': 'Penal en Progreso',
      'Match Suspended': 'Partido Suspendido',
      'Match Interrupted': 'Partido Interrumpido',
      'Match Finished': 'Partido Terminado',
      'Match Finished after extra time': 'Partido Terminado después de tiempo extra',
      'Match Finished after the penalty shootout': 'Partido Terminado después de los penales',
      'Match Postponed': 'Partido Aplazado',
      'Match Cancelled': 'Partido Cancelado',
      'Match Abandoned': 'Partido Abandonado',
      'Technical Loss': 'Pérdida Técnica',
      'WalkOver': 'Victoria por W.O.',
      'In Progress': 'En Progreso'
    };
    return statusTranslations[status] || status;
  }

  hasStarted(): boolean {
    if (!this.match) {
      return false;
    }
    const status = this.match.fixture.status.short;
    return ['1H', 'HT', '2H', 'ET', 'BT', 'P', 'SUSP', 'INT', 'LIVE', 'FT', 'AET', 'PEN'].includes(status);
  }
}
