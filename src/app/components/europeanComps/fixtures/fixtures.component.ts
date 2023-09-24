import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/services/api.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Fixture, LeagueData } from 'src/app/types';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.scss'],
})
export class FixturesComponent implements OnInit {
  @Input() leagueName!: string;
  fixturesLoading: boolean = false;
  currentMatchday!: any;
  displayMatchday!: string;
  selectedLeague!: LeagueData[];
  matchdays: string[] = [];
  fixtureData: Fixture[] = [];
  subscriptions = new Subscription();

  //this is so we have a current matchday that doesnt change,
  //so that if the user selects current in the mat select then it will always
  //be the correct matchday
  currentMatchdayMatOption!: string;

  constructor(private api: ApiService) {}

  async ngOnInit(): Promise<void> {
    this.selectedLeague = this.api.determineLeague(this.leagueName);
    this.getTotalMatchdays();
    await this.getMatchdayRound();
    this.getFixtures(this.currentMatchday);
  }

  //gets the number of matchdays for a season depending on the league
  //this is how the mat select knows how many matchdays to put in the dropdown
  getTotalMatchdays() {
    this.fixturesLoading = true;
    this.api
      .getTotalNumberOfGameWeeks(this.selectedLeague)
      .subscribe((val: Array<string>) => {
        this.matchdays = val;
        this.fixturesLoading = false;
      });
  }

  getMatchdayRound(): Promise<Object> {
    return new Promise((resolve, reject) => {
      this.subscriptions.add(
        this.api.getCurrentFixtureRoundEuropean(this.selectedLeague).subscribe({
          next: (mDay: string) => {
            this.currentMatchday = mDay;
            this.currentMatchdayMatOption = mDay;
            resolve(this.currentMatchday);
          },
          error: (error) => {
            console.log('got an error: ', error);
            reject('got an error');
          },
        })
      );
    });
  }

  getFixtures(rounds: any) {
    let roundsArr;
    //if the string passed has commas, we need to make sure to split it so they are seperate elements
    if (typeof rounds === 'string') {
      roundsArr = rounds.split(',');
    } else {
      roundsArr = rounds;
    }
    this.fixturesLoading = true;

    const observables = roundsArr.map((round: any) =>
      this.api.getFixturesByRound(round, this.selectedLeague)
    );

    this.subscriptions.add(
      forkJoin(observables).subscribe({
        next: (fixturesData: any) => {
          const flattenedData = [].concat(...fixturesData);
          this.fixturesLoading = false;
          this.fixtureData = flattenedData;
          this.displayMatchday = this.currentMatchday;
        },
        error: (error) => console.log('got an error:', error),
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
