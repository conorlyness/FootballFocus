import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Last5DialogComponent } from '../last5-dialog/last5-dialog.component';

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
export class UpcomingFixturesComponent implements OnInit {
  @Input() league!: string;
  fixtureData: any[] = [];
  currentWeekFixtures: any[] = [];
  prem: boolean = false;
  serieA: boolean = false;
  laLiga: boolean = false;
  bundes: boolean = false;
  ligue1: boolean = false;
  loading: boolean = false;
  displayGameweek: any;
  currentGameweek: any;
  previousGameweek: any;
  nextGameweek: any;
  showingCurrentGameweek: boolean = false;
  showingPreviousGameweek: boolean = false;
  showingNextGameweek: boolean = false;
  homeTeamLast5: any[] = [];
  awayTeamLast5: any[] = [];

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
    this.api
      .getCurrentFixtureRound(
        this.prem,
        this.serieA,
        this.laLiga,
        this.bundes,
        this.ligue1
      )
      .subscribe((gWeek: any) => {
        var gameweek = gWeek.match(/\d/g);
        gameweek = gameweek.join('');
        this.currentGameweek = gameweek;
        this.previousGameweek = +gameweek - 1;
        this.nextGameweek = +gameweek + 1;
        console.log('Current gameweek ', this.currentGameweek);
        console.log('previous gameweek: ', +this.currentGameweek - 1);
        console.log('next gameWeek: ', +this.currentGameweek + 1);
        this.api
          .getFixturesByRound(
            gWeek,
            this.prem,
            this.serieA,
            this.laLiga,
            this.bundes,
            this.ligue1
          )
          .subscribe((val: any) => {
            this.loading = false;
            //object de-structuring
            let { response } = val;
            this.currentWeekFixtures = response;
            this.fixtureData = this.currentWeekFixtures;
            this.displayGameweek = this.currentGameweek;
            this.showingCurrentGameweek = true;
            console.log(
              'fixture data for current gameweek : ',
              this.fixtureData
            );
          });
      });
  }

  previousFixtures() {
    let previousFixtures;

    if (this.showingNextGameweek) {
      this.fixtureData = this.currentWeekFixtures;
      this.displayGameweek = this.currentGameweek;
      this.showingNextGameweek = false;
    } else {
      this.loading = true;
      this.api
        .getFixturesByRound(
          `Regular Season - ${this.previousGameweek}`,
          this.prem,
          this.serieA,
          this.laLiga,
          this.bundes,
          this.ligue1
        )
        .subscribe((val: any) => {
          this.loading = false;
          let { response } = val;
          previousFixtures = response;

          this.fixtureData = previousFixtures;
          this.displayGameweek = this.previousGameweek;

          this.showingPreviousGameweek = true;
          console.log('previous week fixture data : ', previousFixtures);
        });
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
      this.api
        .getFixturesByRound(
          `Regular Season - ${this.nextGameweek}`,
          this.prem,
          this.serieA,
          this.laLiga,
          this.bundes,
          this.ligue1
        )
        .subscribe((val: any) => {
          this.loading = false;

          //object de-structuring
          let { response } = val;
          nextWeekFixtures = response;

          this.fixtureData = nextWeekFixtures;
          this.displayGameweek = this.nextGameweek;
          this.showingNextGameweek = true;
        });
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
      this.api
        .getLast5Results(
          homeTeamID,
          this.prem,
          this.serieA,
          this.laLiga,
          this.bundes,
          this.ligue1
        )
        .subscribe((results: any) => {
          const { response } = results;
          this.homeTeamLast5 = response;
          console.log(this.homeTeamLast5);
          this.api
            .getLast5Results(
              awayTeamId,
              this.prem,
              this.serieA,
              this.laLiga,
              this.bundes,
              this.ligue1
            )
            .subscribe((results: any) => {
              const { response } = results;
              this.awayTeamLast5 = response;
              console.log(this.awayTeamLast5);
              const resultsObj = {
                home: this.homeTeamLast5,
                away: this.awayTeamLast5,
              };
              resolve(resultsObj);
            });
        });
    });
  }
}
