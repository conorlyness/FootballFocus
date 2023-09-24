import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/services/api.service';
import { Fixture, LeagueData } from 'src/app/types';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';

@Component({
  selector: 'app-champions-league',
  templateUrl: './champions-league.component.html',
  styleUrls: ['./champions-league.component.scss'],
})
export class ChampionsLeagueComponent implements OnInit {
  options!: GridsterConfig;
  dashboard!: Array<GridsterItem>;
  competitionName: string = 'championsLeague';
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.options = {
      draggable: {
        enabled: true,
      },
      swap: true,
      pushItems: false,
      pushResizeItems: true,
      maxCols: 6,
      resizable: {
        enabled: true,
      },
    };

    this.dashboard = [
      { cols: 6, rows: 3, y: 0, x: 0 },
      { cols: 3, rows: 3, y: 0, x: 0 },
      { cols: 3, rows: 3, y: 0, x: 0 },
    ];
  }
}
