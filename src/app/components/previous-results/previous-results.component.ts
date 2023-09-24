import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription, forkJoin } from 'rxjs';
import { ApiService } from 'src/app/services/services/api.service';
import { Fixture, LeagueData } from 'src/app/types';
import { MatDialog } from '@angular/material/dialog';
import { FixtureStatsDialogComponent } from '../fixture-stats-dialog/fixture-stats-dialog.component';

@Component({
  selector: 'app-previous-results',
  templateUrl: './previous-results.component.html',
  styleUrls: ['./previous-results.component.scss'],
})
export class PreviousResultsComponent implements OnInit, OnDestroy {
  @Input() league!: string;
  fixtureData: Fixture[] = [];
  loading: boolean = false;
  currentGameweek!: string;

  //this is so we have a current game week that doesnt change,
  //so that if the user selects current in the mat select then it will always
  //be the correct current week
  currentGameweekMatOption!: string;
  showingPreviousWeeks: boolean = false;
  subscriptions = new Subscription();
  numberOfGameWeeks: any[] = [];
  selectedLeague!: LeagueData[];

  constructor(private api: ApiService, private dialog: MatDialog) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.selectedLeague = this.api.determineLeague(this.league);

    await this.getGameWeekRound();
    this.getResults(this.currentGameweek);
  }

  getGameWeekRound(): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.subscriptions.add(
        this.api.getCurrentFixtureRound(this.selectedLeague).subscribe({
          next: (gWeek: string) => {
            console.log(gWeek);
            this.currentGameweek = gWeek;
            this.currentGameweekMatOption = gWeek;

            for (let i = 1; i <= +this.currentGameweek; i++) {
              this.numberOfGameWeeks.push(i);
            }
            resolve(this.currentGameweek);
          },
          error: (error) => {
            console.log('got an error: ', error);
            reject('got an error');
          },
        })
      );
    });
  }

  getResults(round: string) {
    this.loading = true;
    const GameweekToPass = `Regular Season - ${round}`;
    this.subscriptions.add(
      this.api
        .getFixturesByRound(GameweekToPass, this.selectedLeague)
        .subscribe({
          next: (fixtures: Array<Fixture>) => {
            this.loading = false;
            this.fixtureData = fixtures;
          },
          error: (error) => console.log('got an error: ', error),
        })
    );
  }

  async loadFixtureStats(fixture: any) {
    console.log('fixture::', fixture);
    let stats = (await this.fetchFixtureStats(fixture.fixture.id)) as any;
    console.log('fetchFixtureStats reutrned::', stats);

    if (!Object.keys(stats)) {
      //user has clicked on a fixture that has not started, meaning no stats available
      //do nothing
    } else {
      const dialogData = {
        homeTeam: stats[0].statistics[0],
        awayTeam: stats[0].statistics[1],
        fixture: stats[0],
      };
      this.openFixtureStats(dialogData);
    }
  }

  fetchFixtureStats(fixtureID: number) {
    console.log('going to fetch stats from game with id::', fixtureID);
    return new Promise((resolve, reject) => {
      this.subscriptions.add(
        this.api.getFixtureById(fixtureID).subscribe({
          next: (res) => {
            resolve(res);
          },
          error: (error) => {
            console.log('got an error: ', error);
            reject('could not get fixture statistics');
          },
        })
      );
    });
  }

  openFixtureStats(dialogData: any) {
    const dialogRef = this.dialog.open(FixtureStatsDialogComponent, {
      width: '900px',
      height: '750px',
      autoFocus: false,
      data: {
        homeTeam: dialogData.homeTeam,
        awayTeam: dialogData.awayTeam,
        fixture: dialogData.fixture,
        league: this.league,
      },
    });

    dialogRef.afterClosed().subscribe();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
