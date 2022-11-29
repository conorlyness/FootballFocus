import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Last5DialogComponent } from '../last5-dialog/last5-dialog.component';
import { forkJoin, Subscription } from 'rxjs';
import { Last5 } from '../../types';

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
  homeTeamLast5: Last5[] = [];
  awayTeamLast5: Last5[] = [];
  totalGameWeeks!: number;
  gameWeeks: any[] = [];
  subscriptions = new Subscription();

  constructor(private api: ApiService, public dialog: MatDialog) {}

  async ngOnInit(): Promise<void> {
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
    this.getTotalGameWeeks();
    await this.getGameWeekRound();
    this.getFixtures(this.currentGameweek);
  }

  //gets the number of game weeks for a season depending on the league
  //this is how the mat select knows how many gameweeks to put in the dropdown
  getTotalGameWeeks() {
    this.loading = true;
    this.api
      .getTotalNumberOfGameWeeks(
        this.prem,
        this.serieA,
        this.laLiga,
        this.bundes,
        this.ligue1
      )
      .subscribe((val: any) => {
        this.totalGameWeeks = val.length;
        for (let i = 1; i <= this.totalGameWeeks; i++) {
          this.gameWeeks.push(i);
        }
        this.loading = false;
      });
  }

  getGameWeekRound(): Promise<Object> {
    return new Promise((resolve, reject) => {
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
              var gameweek = gWeek.match(/(\d+)/)[0];

              this.currentGameweek = gameweek;
              console.log('Current gameweek ', this.currentGameweek);
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

  getFixtures(round: number) {
    this.loading = true;
    const GameweekToPass = `Regular Season - ${round}`;
    this.subscriptions.add(
      this.api
        .getFixturesByRound(
          GameweekToPass,
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
            console.log(
              'fixture data for current gameweek : ',
              this.fixtureData
            );
          },
          error: (error) => console.log('got an error: ', error),
        })
    );
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

  fetchLast5Results(homeTeamID: number, awayTeamId: number): Promise<Object> {
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
            this.homeTeamLast5 = home as Array<Last5>;
            this.awayTeamLast5 = away as Array<Last5>;
            const resultsObj = {
              home: this.homeTeamLast5,
              away: this.awayTeamLast5,
            };
            resolve(resultsObj);
          },
          error: (error) => {
            console.log('got an error: ', error);
            reject('could not get last 5 games');
          },
        })
      );
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
