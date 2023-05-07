import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/services/api.service';
import { LeageSeasons, LeagueData, LeagueTable } from 'src/app/types';
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
  leagueSeasons: Array<LeageSeasons> = [
    { value: '2022', displayName: 'Season - 22/23' },
    { value: '2021', displayName: 'Season - 21/22' },
    { value: '2020', displayName: 'Season - 20/21' },
    { value: '2019', displayName: 'Season - 19/20' },
    { value: '2018', displayName: 'Season - 18/19' },
  ];
  loading: boolean = false;
  subscriptions = new Subscription();
  season: string = (new Date().getFullYear() - 1).toString();
  currentSeason: string = (new Date().getFullYear() - 1).toString();
  selectedLeague!: LeagueData[];

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
    this.selectedLeague = this.api.determineLeague(this.league);

    //this will get the current seasons table initally
    this.getLeagueTable(this.season);
  }

  getLeagueTable(season: string) {
    this.loading = true;
    this.tableData = [];
    this.subscriptions.add(
      this.api.getLeagueTable(season, this.selectedLeague).subscribe({
        next: (data: any) => {
          this.loading = false;
          data.response[0].league.standings[0].forEach(
            (element: LeagueTable) => {
              this.tableData.push(element);
            }
          );
        },
        error: (error) => console.log('got an error: ', error),
      })
    );
  }

  showTeam(teamName: string) {
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

    dialogRef.afterClosed().subscribe();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
