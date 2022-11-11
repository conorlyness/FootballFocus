import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/services/api.service';
import { LeagueResults } from 'src/app/types';

@Component({
  selector: 'app-previous-results',
  templateUrl: './previous-results.component.html',
  styleUrls: ['./previous-results.component.scss'],
})
export class PreviousResultsComponent implements OnInit, OnDestroy {
  @Input() league!: string;
  fixtureData: LeagueResults[] = [];
  previousResultsData: LeagueResults[] = [];
  currentResultsData: LeagueResults[] = [];
  prem: boolean = false;
  serieA: boolean = false;
  laLiga: boolean = false;
  bundes: boolean = false;
  ligue1: boolean = false;
  loading: boolean = false;
  currentGameweek: any;
  showingPreviousWeeks: boolean = false;
  subscriptions = new Subscription();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loading = true;

    if (this.league === 'prem') {
      this.prem = true;
    } else if (this.league === 'serieA') {
      this.serieA = true;
    } else if (this.league === 'laLiga') {
      this.laLiga = true;
    } else if (this.league === 'bundes') {
      this.bundes = true;
    } else {
      this.ligue1 = true;
    }

    this.subscriptions.add(
      this.api
        .getCurrentFixtureRound(
          this.prem,
          this.serieA,
          this.laLiga,
          this.bundes,
          this.ligue1
        )
        .subscribe({
          next: (gWeek: any) => {
            var gameweek = gWeek.match(/\d/g);
            gameweek = gameweek.join('');
            this.currentGameweek = gameweek;
            console.log('Current gameweek ', this.currentGameweek);
          },
          error: (error) => console.log('got an error: ', error),
        })
    );

    this.subscriptions.add(
      this.api
        .getLeagueResults(
          this.prem,
          this.serieA,
          this.laLiga,
          this.bundes,
          this.ligue1
        )
        .subscribe({
          next: (data: any) => {
            this.loading = false;
            const fixturesObj = data[0];

            this.currentResultsData = fixturesObj[Object.keys(fixturesObj)[0]];
            this.previousResultsData = fixturesObj[Object.keys(fixturesObj)[1]];
            this.fixtureData = this.currentResultsData;
            console.log('league fixtures', this.fixtureData);
          },
          error: (error) => console.log('got an error: ', error),
        })
    );
  }

  //shows previous game weeks results
  showPreviousResults() {
    this.fixtureData = this.previousResultsData;
    this.currentGameweek = this.currentGameweek - 1;
    this.showingPreviousWeeks = true;
  }

  //shows current game weeks results
  showCurrentResults() {
    this.fixtureData = this.currentResultsData;
    this.currentGameweek = this.currentGameweek + 1;
    this.showingPreviousWeeks = false;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
