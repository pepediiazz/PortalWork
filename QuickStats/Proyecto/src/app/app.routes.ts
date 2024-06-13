import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FootballComponent } from './componentes/football/football.component';
import { BasketballComponent } from './componentes/basketball/basketball.component';
import { BaseballComponent } from './componentes/baseball/baseball.component';
import { RugbyComponent } from './componentes/rugby/rugby.component';
import { HockeyComponent } from './componentes/hockey/hockey.component';
import { HandballComponent } from './componentes/handball/handball.component';
import { VolleyballComponent } from './componentes/volleyball/volleyball.component';
import { WidgetsComponent } from './componentes/football/ligas-populares/widgets/widgets.component';
import { WidgetsComponentBasket } from './componentes/basketball/ligas-populares-basketball/widgets/widgets.component';
import { WidgetsComponentBaseball } from './componentes/baseball/ligas-populares-baseball/widgets/widgets.component';
import { WidgetsHandballComponent } from './componentes/handball/ligas-populares-handball/widgets/widgets.component';
import { WidgetsRugbyComponent } from './componentes/rugby/ligas-populares-rugby/widgets/widgets.component';
import { WidgetsVolleyballComponent } from './componentes/volleyball/ligas-populares-volleyball/widgets/widgets.component';
import { WidgetsHockeyComponent } from './componentes/hockey/ligas-populares-hockey/widgets/widgets.component';


export const routes: Routes = [
  { path: 'football', component: FootballComponent },
  { path: 'football/widget/:leagueId/:season', component: WidgetsComponent },
  { path: 'basketball', component: BasketballComponent },
  { path: 'basketball/widget/:leagueId/:season', component: WidgetsComponentBasket },
  { path: 'rugby', component: RugbyComponent },
  { path: 'rugby/widget/:leagueId/:season', component: WidgetsRugbyComponent },
  { path: 'baseball', component: BaseballComponent },
  { path: 'baseball/widget/:leagueId/:season', component: WidgetsComponentBaseball },
  { path: 'balonmano', component: HandballComponent },
  { path: 'balonmano/widget/:leagueId/:season', component: WidgetsHandballComponent },
  { path: 'volleyball', component: VolleyballComponent },
  { path: 'volleyball/widget/:leagueId/:season', component: WidgetsVolleyballComponent },
  { path: 'hockey', component: HockeyComponent },
  { path: 'hockey/widget/:leagueId/:season', component: WidgetsHockeyComponent },
  { path: '**', redirectTo: 'football', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
