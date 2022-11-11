import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Last5DialogComponent } from '../last5-dialog/last5-dialog.component';
import { forkJoin, Subscription } from 'rxjs';
import { LeagueRound } from '../../types';

export interface DialogData {
  homeTeamName: string;
  awayTeamName: string;
  homeTeam: any;
  awayTeam: any;
}

@Component({
  selector: 'app-upcoming-fixtures',
  templateUrl: './upcoming-fixtures.component.html',
  styleUrls: ['./upcoming-fixtures.component.scss'],
})
export class UpcomingFixturesComponent implements OnInit, OnDestroy {
  @Input() league!: string;
  fixtureData: any[] = [];
  currentWeekFixtures: object[] = [];
  prem: boolean = false;
  serieA: boolean = false;
  laLiga: boolean = false;
  bundes: boolean = false;
  ligue1: boolean = false;
  loading: boolean = false;
  displayGameweek!: any;
  currentGameweek!: any;
  previousGameweek!: any;
  nextGameweek!: any;
  showingCurrentGameweek: boolean = false;
  showingPreviousGameweek: boolean = false;
  showingNextGameweek: boolean = false;
  homeTeamLast5: any[] = [];
  awayTeamLast5: any[] = [];
  subscriptions = new Subscription();

  constructor(private api: ApiService, public dialog: MatDialog) {}

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
            console.log(gWeek);
            var gameweek = gWeek.match(/(\d+)/)[0];

            this.currentGameweek = gameweek;
            this.previousGameweek = +gameweek - 1;
            this.nextGameweek = +gameweek + 1;

            this.subscriptions.add(
              this.api
                .getFixturesByRound(
                  gWeek,
                  this.prem,
                  this.serieA,
                  this.laLiga,
                  this.bundes,
                  this.ligue1
                )
                .subscribe({
                  next: (val: Array<object>) => {
                    this.loading = false;

                    let fixtures = val;
                    this.currentWeekFixtures = fixtures;
                    this.fixtureData = this.currentWeekFixtures;
                    this.displayGameweek = this.currentGameweek;
                    this.showingCurrentGameweek = true;
                    console.log(
                      'fixture data for current gameweek : ',
                      this.fixtureData
                    );
                  },
                  error: (error) => console.log('got an error: ', error),
                })
            );
          },
          error: (error) => console.log('got an error: ', error),
        })
    );
  }

  previousFixtures() {
    let previousFixtures;

    if (this.showingNextGameweek) {
      this.fixtureData = this.currentWeekFixtures;
      this.displayGameweek = this.currentGameweek;
      this.showingNextGameweek = false;
    } else {
      this.loading = true;
      const previousGameweek = `Regular Season - ${this.previousGameweek}`;
      this.subscriptions.add(
        this.api
          .getFixturesByRound(
            previousGameweek,
            this.prem,
            this.serieA,
            this.laLiga,
            this.bundes,
            this.ligue1
          )
          .subscribe({
            next: (val: Array<object>) => {
              this.loading = false;
              previousFixtures = val;
              this.fixtureData = previousFixtures;
              this.displayGameweek = this.previousGameweek;
              this.showingPreviousGameweek = true;
            },
            error: (error) => console.log('got an error: ', error),
          })
      );
    }
  }

  upcomingFixtures() {
    let nextWeekFixtures;

    if (this.showingPreviousGameweek) {
      this.fixtureData = this.currentWeekFixtures;
      this.displayGameweek = this.currentGameweek;
      this.showingPreviousGameweek = false;
    } else {
      this.loading = true;
      const upcomingGameweek = `Regular Season - ${this.nextGameweek}`;
      this.subscriptions.add(
        this.api
          .getFixturesByRound(
            upcomingGameweek,
            this.prem,
            this.serieA,
            this.laLiga,
            this.bundes,
            this.ligue1
          )
          .subscribe({
            next: (val: Array<object>) => {
              this.loading = false;
              nextWeekFixtures = val;
              this.fixtureData = nextWeekFixtures;
              this.displayGameweek = this.nextGameweek;
              this.showingNextGameweek = true;
            },
            error: (error) => console.log('got an error: ', error),
          })
      );
    }
  }

  async showTeamsPrevGames(
    homeTeamID: number,
    awayTeamId: number,
    homeName: string,
    awayName: string
  ) {
    await this.fetchLast5Results(homeTeamID, awayTeamId);

    const dialogData = {
      homeTeamName: homeName,
      awayTeamName: awayName,
      homeTeam: this.homeTeamLast5,
      awayTeam: this.awayTeamLast5,
    };
    this.openDialog(dialogData);
  }

  openDialog(data: DialogData): void {
    const dialogRef = this.dialog.open(Last5DialogComponent, {
      width: '900px',
      height: '850px',
      data: {
        homeTeam: data.homeTeam,
        awayTeam: data.awayTeam,
        homeTeamName: data.homeTeamName,
        awayTeamName: data.awayTeamName,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  fetchLast5Results(homeTeamID: number, awayTeamId: number) {
    return new Promise((resolve, reject) => {
      let homeTeam = this.api.getLast5Results(
        homeTeamID,
        this.prem,
        this.serieA,
        this.laLiga,
        this.bundes,
        this.ligue1
      );

      let awayTeam = this.api.getLast5Results(
        awayTeamId,
        this.prem,
        this.serieA,
        this.laLiga,
        this.bundes,
        this.ligue1
      );

      let homeAndAwayLast5 = forkJoin({ home: homeTeam, away: awayTeam });

      this.subscriptions.add(
        homeAndAwayLast5.subscribe({
          next: (res) => {
            const { home } = res;
            const { away } = res;
            this.homeTeamLast5 = home as any;
            this.awayTeamLast5 = away as any;
            const resultsObj = {
              home: this.homeTeamLast5,
              away: this.awayTeamLast5,
            };
            resolve(resultsObj);
          },
          error: (error) => console.log('got an error: ', error),
        })
      );
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
