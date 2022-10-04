import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { LeagueTableComponent } from './components/league-table/league-table.component';
import { PremierLeagueComponent } from './components/premier-league/premier-league.component';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { SerieAComponent } from './components/serie-a/serie-a.component';
import { LaLigaComponent } from './components/la-liga/la-liga.component';
import { BundesligaComponent } from './components/bundesliga/bundesliga.component';
import { Ligue1Component } from './components/ligue1/ligue1.component';
import { UpcomingFixturesComponent } from './components/upcoming-fixtures/upcoming-fixtures.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { PreviousResultsComponent } from './components/previous-results/previous-results.component';

@NgModule({
  declarations: [
    AppComponent,
    LeagueTableComponent,
    PremierLeagueComponent,
    SerieAComponent,
    LaLigaComponent,
    BundesligaComponent,
    Ligue1Component,
    UpcomingFixturesComponent,
    PreviousResultsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatGridListModule,
    MatTabsModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
