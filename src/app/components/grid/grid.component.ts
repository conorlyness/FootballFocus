import { Component, Input, OnInit } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Input() leagueName!: string;
  @Input() leagueImg!: string;
  options!: GridsterConfig;
  dashboard!: Array<GridsterItem>;

  constructor() {}

  ngOnInit(): void {
    this.options = {
      draggable: {
        enabled: true,
      },
      swap: true,
      pushItems: false,
      maxCols: 6,
      resizable: {
        enabled: true,
      },
    };

    this.dashboard = [
      { cols: 1, rows: 2, y: 0, x: 0 },
      { cols: 3, rows: 2, y: 0, x: 0 },
      { cols: 2, rows: 6, y: 0, x: 0 },
      { cols: 4, rows: 2, y: 0, x: 0 },
      { cols: 4, rows: 2, y: 0, x: 0 },
    ];
  }

  changedOptions() {
    this.options.api?.optionsChanged?.();
  }
}
