import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Match } from '../../../interfaces/FootballResponse';

Chart.register(...registerables);

@Component({
  selector: 'app-match-possession',
  templateUrl: './match-possession.component.html',
  styleUrls: ['./match-possession.component.css'],
  standalone: true,
  imports: [CommonModule, BaseChartDirective]
})
export class MatchPossessionComponent implements OnInit {
  @Input() match: Match | null = null;

  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    }
  };

  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: []
  };

  ngOnInit(): void {
    if (this.match?.statistics) {
      const homePossession = this.extractStatistic(this.match.statistics, this.match.teams.home.id, 'Ball Possession');
      const awayPossession = this.extractStatistic(this.match.statistics, this.match.teams.away.id, 'Ball Possession');
      this.doughnutChartData.labels = [this.match.teams.home.name, this.match.teams.away.name];
      this.doughnutChartData.datasets = [
        { data: [homePossession, awayPossession], backgroundColor: ['#0000FF', '#FF0000'] }
      ];
    } else {
      console.error('Datos de estadísticas no disponibles o incompletos');
    }
  }

  extractStatistic(stats: any, teamId: number, type: string): number {
    const teamStats = stats.find((stat: any) => stat.team.id === teamId);
    const stat = teamStats?.statistics.find((s: any) => s.type === type);
    if (stat && typeof stat.value === 'string' && stat.value.includes('%')) {
      return parseFloat(stat.value.replace('%', '')); // Convertir posesión a número si es porcentaje
    }
    return stat ? Number(stat.value) : 0;
  }
}
