import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/services/api.service';
import { LeagueTable } from 'src/app/types';
import { MatDialog } from '@angular/material/dialog';
import { TeamStatsDialogComponent } from '../team-stats-dialog/team-stats-dialog.component';

export interface DialogData {
  stats: any;
}

@Component({
  selector: 'app-league-table',
  templateUrl: './league-table.component.html',
  styleUrls: ['./league-table.component.scss'],
})
export class LeagueTableComponent implements OnInit, OnDestroy {
  @Input() league!: string;
  tableData: Array<LeagueTable> = [];
  prem: boolean = false;
  serieA: boolean = false;
  laLiga: boolean = false;
  bundes: boolean = false;
  ligue1: boolean = false;
  loading: boolean = false;
  subscriptions = new Subscription();
  season: string = '2022';

  constructor(private api: ApiService, public dialog: MatDialog) {}
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

    //this will get the current seasons table initally
    this.getLeagueTable(this.season);
  }

  getLeagueTable(season: string) {
    this.loading = true;
    this.tableData = [];
    this.subscriptions.add(
      this.api
        .getLeagueTable(
          season,
          this.prem,
          this.serieA,
          this.laLiga,
          this.bundes,
          this.ligue1
        )
        .subscribe({
          next: (data: any) => {
            this.loading = false;
            data.response[0].league.standings[0].forEach(
              (element: LeagueTable) => {
                this.tableData.push(element);
              }
            );
            console.log('league table', data);
          },
          error: (error) => console.log('got an error: ', error),
        })
    );
  }

  showTeam(teamName: any) {
    const dialogData = {
      stats: teamName,
    };

    this.openStatsDialog(dialogData);
  }

  openStatsDialog(data: DialogData): void {
    const dialogRef = this.dialog.open(TeamStatsDialogComponent, {
      width: '900px',
      height: '850px',
      data: {
        stats: data.stats,
      },
    });

    dialogRef
      .afterClosed()
      .subscribe(() => console.log('The dialog was closed'));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
