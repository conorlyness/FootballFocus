import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/services/api.service';

@Component({
  selector: 'app-upcoming-fixtures',
  templateUrl: './upcoming-fixtures.component.html',
  styleUrls: ['./upcoming-fixtures.component.scss'],
})
export class UpcomingFixturesComponent implements OnInit {
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
      .getCurrentFixtureRound(
        this.prem,
        this.serieA,
        this.laLiga,
        this.bundes,
        this.ligue1
      )
      .subscribe((val: any) => {
        this.api
          .getFixturesByRound(
            val,
            this.prem,
            this.serieA,
            this.laLiga,
            this.bundes,
            this.ligue1
          )
          .subscribe((val: any) => {
            let fixtures: any = [{ fixtures: val['response'] }];
            this.fixtureData = fixtures[0].fixtures;
            console.log('fixture data : ', this.fixtureData);
          });
      });
  }
}
