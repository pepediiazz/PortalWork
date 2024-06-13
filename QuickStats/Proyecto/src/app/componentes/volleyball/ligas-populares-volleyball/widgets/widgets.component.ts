import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { LigasPopularesVolleyballComponent } from '../ligas-populares-volleyball.component';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css'],
  standalone: true,
  imports: [HeaderComponent,LigasPopularesVolleyballComponent]
})
export class WidgetsVolleyballComponent implements AfterViewInit {
  leagueId: string = '';
  season: string = '';

  constructor(private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit(): void {
    this.leagueId = this.route.snapshot.paramMap.get('leagueId') ?? '39'; // Usa una liga por defecto si no se encuentra
    this.season = this.route.snapshot.paramMap.get('season') ?? '2021'; // Usa una temporada por defecto si no se encuentra
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeWidget();
    }
  }

  initializeWidget(): void {
    const widgetContainer = document.getElementById('wg-api-volleyball-standings');
    if (widgetContainer) {
      widgetContainer.setAttribute('data-host', 'v1.volleyball.api-sports.io');
      widgetContainer.setAttribute('data-key', '9d96d5810b8f9eab3e637b2c915020f1');
      widgetContainer.setAttribute('data-league', this.leagueId);
      widgetContainer.setAttribute('data-season', this.season);
      widgetContainer.setAttribute('data-team', '');
      widgetContainer.setAttribute('data-theme', 'false');
      widgetContainer.setAttribute('data-show-errors', 'false');
      widgetContainer.setAttribute('data-show-logos', 'true');
      widgetContainer.setAttribute('class', 'wg_loader');

      const event = new Event('DOMContentLoaded', {
        bubbles: true,
        cancelable: true
      });
      window.document.dispatchEvent(event);
    }
  }
  changeSeason(increment: number): void {
    const currentYear = parseInt(this.season, 10);
    const newYear = currentYear + increment;
    this.season = `${newYear}`;
    this.initializeWidget();
  }
}
