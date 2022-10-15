import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/services/api.service';
import { LeagueTable } from 'src/app/types';

@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.scss'],
})
export class LeagueTableComponent implements OnInit {
  @Input() league!: string;
  tableData: Array<LeagueTable> = [];
  prem: boolean = false;
  serieA: boolean = false;
  laLiga: boolean = false;
  bundes: boolean = false;
  ligue1: boolean = false;
  loading: boolean = false;
  constructor(private api: ApiService, private cd: ChangeDetectorRef) {}

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
      .getLeagueTable(
        this.prem,
        this.serieA,
        this.laLiga,
        this.bundes,
        this.ligue1
      )
      .subscribe((data: any) => {
        this.loading = false;
        data.forEach((element: LeagueTable) => {
          this.tableData.push(element);
        });
        console.log('league table', data);
      });
  }

  displayedColumns: string[] = [
    'Position',
    'Team',
    'Games Played',
    'Won',
    'Lost',
    'Drew',
    'Goal Diff',
    'Points',
  ];

  dataSource = this.tableData;
}
