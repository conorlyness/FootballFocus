import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/services/api.service';

@Component({
  selector: 'app-previous-results',
  templateUrl: './previous-results.component.html',
  styleUrls: ['./previous-results.component.scss'],
})
export class PreviousResultsComponent implements OnInit {
  @Input() league!: string;
  fixtureData: any[] = [];
  previousResultsData: any[] = [];
  currentResultsData: any[] = [];
  prem: boolean = false;
  serieA: boolean = false;
  laLiga: boolean = false;
  bundes: boolean = false;
  ligue1: boolean = false;
  loading: boolean = false;
  currentGameweek: any;
  showingPreviousWeeks: boolean = false;
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
        console.log('Current gameweek ', this.currentGameweek);
      });

    this.api
      .getLeagueResults(
        this.prem,
        this.serieA,
        this.laLiga,
        this.bundes,
        this.ligue1
      )
      .subscribe((data: any) => {
        this.loading = false;
        const fixturesObj = data[0];

        this.currentResultsData = fixturesObj[Object.keys(fixturesObj)[0]];
        this.previousResultsData = fixturesObj[Object.keys(fixturesObj)[1]];
        //gets the first object in the object
        this.fixtureData = this.currentResultsData;
        console.log('league fixtures', this.fixtureData);
      });
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
}
