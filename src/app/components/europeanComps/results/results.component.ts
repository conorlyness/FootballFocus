import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/services/api.service';
import { Fixture, LeagueData } from 'src/app/types';
import { Subscription } from 'rxjs/internal/Subscription';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  @Input() leagueName!: string;
  currentMatchday!: any;
  selectedLeague!: LeagueData[];
  resultsDisplayMatchday!: string;
  resultsLoading: boolean = false;
  resultData: Fixture[] = [];
  matchdays: string[] = [];
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
    this.getResults(this.currentMatchday);
  }

  //gets the number of matchdays for a season depending on the league
  //this is how the mat select knows how many matchdays to put in the dropdown
  getTotalMatchdays() {
    this.resultsLoading = true;
    this.api
      .getTotalNumberOfGameWeeks(this.selectedLeague)
      .subscribe((val: Array<string>) => {
        console.log('resp from get total number of game weeks::', val);
        this.matchdays = val;
        this.resultsLoading = false;
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

  getResults(matchday: any) {
    console.log('going to get results for::', matchday);
    let matchDayArr;
    //if the string passed has commas, we need to make sure to split it so they are seperate elements
    if (typeof matchday === 'string') {
      matchDayArr = matchday.split(',');
    } else {
      matchDayArr = matchday;
    }
    this.resultsLoading = true;
    const observables = matchDayArr.map((md: any) =>
      this.api.getFixturesByRound(md, this.selectedLeague)
    );

    this.subscriptions.add(
      forkJoin(observables).subscribe({
        next: (fixturesData: any) => {
          const flattenedData = [].concat(...fixturesData);
          this.resultsLoading = false;
          this.resultData = flattenedData;
          this.resultsDisplayMatchday = matchday;
        },
        error: (error) => console.log('got an error:', error),
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
