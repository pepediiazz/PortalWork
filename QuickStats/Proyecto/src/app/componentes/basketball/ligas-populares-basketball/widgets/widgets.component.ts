import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css'],
  standalone: true,
  imports: [HeaderComponent]
})
export class WidgetsComponentBasket implements AfterViewInit {
  leagueId: string = '';
  season: string = '';

  constructor(private route: ActivatedRoute, private router: Router, @Inject(PLATFORM_ID) private platformId: any) { }

  ngOnInit(): void {
    this.leagueId = this.route.snapshot.paramMap.get('leagueId') ?? '39';
    this.season = this.route.snapshot.paramMap.get('season') ?? '2023-2024';
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeWidget();
    }
  }

  initializeWidget(): void {
    const widgetContainer = document.getElementById('wg-api-basketball-standings');
    if (widgetContainer) {
      widgetContainer.setAttribute('data-host', 'v1.basketball.api-sports.io');
      widgetContainer.setAttribute('data-key', '9d96d5810b8f9eab3e637b2c915020f1');
      widgetContainer.setAttribute('data-league', this.leagueId);
      widgetContainer.setAttribute('data-season', this.season);
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
    const years = this.season.split('-').map(year => parseInt(year, 10));
    const newStartYear = years[0] + increment;
    const newEndYear = years[1] + increment;
    this.season = `${newStartYear}-${newEndYear}`;
    this.initializeWidget();
  }
}
