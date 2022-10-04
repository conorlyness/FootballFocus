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
  prem: boolean = false;
  serieA: boolean = false;
  laLiga: boolean = false;
  bundes: boolean = false;
  ligue1: boolean = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
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
      .getLeagueResults(
        this.prem,
        this.serieA,
        this.laLiga,
        this.bundes,
        this.ligue1
      )
      .subscribe((data: any) => {
        const fixturesObj = data[0];
        //gets the first object in the object
        this.fixtureData = fixturesObj[Object.keys(fixturesObj)[0]];
        console.log('league fixtures', this.fixtureData);
      });
  }
}
