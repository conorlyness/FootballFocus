import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Last5DialogComponent } from '../last5-dialog/last5-dialog.component';
import { forkJoin, Subscription } from 'rxjs';
import { Fixture, Last5, LeagueData } from '../../types';

export interface DialogData {
  homeTeamName: string;
  awayTeamName: string;
  homeTeam: Last5[];
  awayTeam: Last5[];
}

@Component({
  selector: 'app-upcoming-fixtures',
  templateUrl: './upcoming-fixtures.component.html',
  styleUrls: ['./upcoming-fixtures.component.scss'],
})
export class UpcomingFixturesComponent implements OnInit, OnDestroy {
  @Input() league!: string;
  fixtureData: Fixture[] = [];
  loading: boolean = false;
  displayGameweek!: string;
  currentGameweek!: string;

  //this is so we have a current game week that doesnt change,
  //so that if the user selects current in the mat select then it will always
  //be the correct current week
  currentGameweekMatOption!: string;
  homeTeamLast5: Last5[] = [];
  awayTeamLast5: Last5[] = [];
  totalGameWeeks!: number;
  gameWeeks: number[] = [];
  subscriptions = new Subscription();
  selectedLeague!: LeagueData[];

  constructor(private api: ApiService, public dialog: MatDialog) {}

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.selectedLeague = this.api.determineLeague(this.league);

    this.getTotalGameWeeks();
    await this.getGameWeekRound();
    this.getFixtures(this.currentGameweek);
  }

  //gets the number of game weeks for a season depending on the league
  //this is how the mat select knows how many gameweeks to put in the dropdown
  getTotalGameWeeks() {
    this.loading = true;
    this.api
      .getTotalNumberOfGameWeeks(this.selectedLeague)
      .subscribe((val: Array<string>) => {
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
        this.api.getCurrentFixtureRound(this.selectedLeague).subscribe({
          next: (gWeek: string) => {
            this.currentGameweek = gWeek;
            this.currentGameweekMatOption = gWeek;
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

  getFixtures(round: string) {
    this.loading = true;
    const GameweekToPass = `Regular Season - ${round}`;
    this.subscriptions.add(
      this.api
        .getFixturesByRound(GameweekToPass, this.selectedLeague)
        .subscribe({
          next: (val: Array<Fixture>) => {
            this.loading = false;
            this.fixtureData = val;
            this.displayGameweek = this.currentGameweek;
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

    dialogRef.afterClosed().subscribe();
  }

  fetchLast5Results(homeTeamID: number, awayTeamId: number): Promise<Object> {
    return new Promise((resolve, reject) => {
      let homeTeam = this.api.getLast5Results(homeTeamID, this.selectedLeague);

      let awayTeam = this.api.getLast5Results(awayTeamId, this.selectedLeague);

      let homeAndAwayLast5 = forkJoin({ home: homeTeam, away: awayTeam });

      this.subscriptions.add(
        homeAndAwayLast5.subscribe({
          next: (res) => {
            const { home } = res;
            const { away } = res;
            this.homeTeamLast5 = home;
            this.awayTeamLast5 = away;

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
