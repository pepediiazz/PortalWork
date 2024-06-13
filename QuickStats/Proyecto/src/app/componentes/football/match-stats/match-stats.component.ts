import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartData, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Match } from '../../../interfaces/FootballResponse';

Chart.register(...registerables);

@Component({
  selector: 'app-match-stats',
  templateUrl: './match-stats.component.html',
  styleUrls: ['./match-stats.component.css'],
  standalone: true,
  imports: [CommonModule, BaseChartDirective]
})
export class MatchStatsComponent implements OnInit {
  @Input() match: Match | null = null;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: { 
        beginAtZero: true
      },
      y: {}
    },
    plugins: {
      legend: {
        display: true,
      },
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: ['Tiros Totales', 'Tiros a Puerta', 'Faltas', 'Tarjetas Amarillas', 'Tarjetas Rojas', 'Corners', 'Fueras de Juego'],
    datasets: []
  };

  ngOnInit(): void {
    if (this.match?.statistics) {
      this.barChartData.datasets = [
        { data: this.getHomeTeamStats(), label: this.match.teams.home.name, backgroundColor: 'rgba(0, 0, 255, 0.6)', borderColor: 'rgba(0, 0, 255, 1)' },
        { data: this.getAwayTeamStats(), label: this.match.teams.away.name, backgroundColor: 'rgba(255, 0, 0, 0.6)', borderColor: 'rgba(255, 0, 0, 1)' }
      ];
    } else {
      console.error('Datos de estadísticas no disponibles o incompletos');
    }
  }

  getHomeTeamStats(): number[] {
    const homeStats = this.match?.statistics?.find((stat: any) => stat.team.id === this.match?.teams.home.id);
    return homeStats ? [
      this.extractStatistic(homeStats, 'Total Shots'),
      this.extractStatistic(homeStats, 'Shots on Goal'),
      this.extractStatistic(homeStats, 'Fouls'),
      this.extractStatistic(homeStats, 'Yellow Cards'),
      this.extractStatistic(homeStats, 'Red Cards'),
      this.extractStatistic(homeStats, 'Corner Kicks'),
      this.extractStatistic(homeStats, 'Offsides')
    ] : Array(7).fill(0);
  }

  getAwayTeamStats(): number[] {
    const awayStats = this.match?.statistics?.find((stat: any) => stat.team.id === this.match?.teams.away.id);
    return awayStats ? [
      this.extractStatistic(awayStats, 'Total Shots'),
      this.extractStatistic(awayStats, 'Shots on Goal'),
      this.extractStatistic(awayStats, 'Fouls'),
      this.extractStatistic(awayStats, 'Yellow Cards'),
      this.extractStatistic(awayStats, 'Red Cards'),
      this.extractStatistic(awayStats, 'Corner Kicks'),
      this.extractStatistic(awayStats, 'Offsides')
    ] : Array(7).fill(0);
  }

  extractStatistic(stats: any, type: string): number {
    const stat = stats.statistics.find((s: any) => s.type === type);
    return stat ? Number(stat.value) : 0;
  }
}
