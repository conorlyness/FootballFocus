import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/services/api.service';
import { Fixture, LeagueData } from 'src/app/types';

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

  constructor(private api: ApiService) {}

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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
