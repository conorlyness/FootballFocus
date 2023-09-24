import { Component, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';

@Component({
  selector: 'app-europa-league',
  templateUrl: './europa-league.component.html',
  styleUrls: ['./europa-league.component.scss'],
})
export class EuropaLeagueComponent implements OnInit {
  options!: GridsterConfig;
  dashboard!: Array<GridsterItem>;
  competitionName: string = 'europaLeague';
  constructor() {}

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
