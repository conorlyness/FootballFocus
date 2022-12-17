import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from '../league-table/league-table.component';
import { ExtendedTeamDetails, Player, TeamStats } from 'src/app/types';
import { ApiService } from 'src/app/services/services/api.service';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-team-stats-dialog',
  templateUrl: './team-stats-dialog.component.html',
  styleUrls: ['./team-stats-dialog.component.scss'],
})
export class TeamStatsDialogComponent implements OnInit, OnDestroy {
  teamStats!: TeamStats;
  teamForm: string[] = [];
  teamID!: number;
  detailedTeamStats?: ExtendedTeamDetails;
  detailedPlayerStats!: Array<Player>;
  loading: boolean = false;
  subscriptions = new Subscription();

  displayedColumns: string[] = ['photo', 'Name', 'Age', 'Position', 'Number'];

  dataSource = this.detailedPlayerStats;

  constructor(
    public dialogRef: MatDialogRef<TeamStatsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public api: ApiService
  ) {
    this.teamStats = this.data.stats;
  }

  ngOnInit(): void {
    let formString = this.teamStats?.form;
    this.teamForm = formString?.split('');
    this.teamID = this.teamStats?.team.id;

    console.log(this.teamStats);
  }

  ngAfterContentInit() {
    this.getMoreDetails(this.teamID);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getMoreDetails(id: number) {
    this.loading = true;
    console.log('called get more details with id of: ', id);
    let teamDetails = this.api.getTeamsDetails(id);
    let playerDetails = this.api.getTeamsPlayers(id);

    let teamAndPlayers = forkJoin({
      team: teamDetails,
      players: playerDetails,
    });

    this.subscriptions.add(
      teamAndPlayers.subscribe({
        next: (value) => {
          const { team } = value;
          const { players } = value;

          this.detailedTeamStats = team;
          this.detailedPlayerStats = players;

          this.loading = false;
        },
        error: (err) => console.log('got an error: ', err),
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
