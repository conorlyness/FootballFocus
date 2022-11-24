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
import { SerieAComponent } from './components/serie-a/serie-a.component';
import { LaLigaComponent } from './components/la-liga/la-liga.component';
import { BundesligaComponent } from './components/bundesliga/bundesliga.component';
import { Ligue1Component } from './components/ligue1/ligue1.component';
import { UpcomingFixturesComponent } from './components/upcoming-fixtures/upcoming-fixtures.component';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { PreviousResultsComponent } from './components/previous-results/previous-results.component';
import { HighlightsComponent } from './components/highlights/highlights.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TopScorersComponent } from './components/top-scorers/top-scorers.component';
import { LeagueNewsComponent } from './components/league-news/league-news.component';
import { GridComponent } from './components/grid/grid.component';
import { GridsterModule } from 'angular-gridster2';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Last5DialogComponent } from './components/last5-dialog/last5-dialog.component';
import { TeamStatsDialogComponent } from './components/team-stats-dialog/team-stats-dialog.component';
import { OrdinalPipe } from './pipes/ordinal.pipe';
import { MatSelectModule } from '@angular/material/select';

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
    HighlightsComponent,
    TopScorersComponent,
    LeagueNewsComponent,
    GridComponent,
    Last5DialogComponent,
    TeamStatsDialogComponent,
    OrdinalPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    MatGridListModule,
    MatTabsModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    GridsterModule,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
