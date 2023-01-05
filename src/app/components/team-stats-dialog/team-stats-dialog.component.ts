import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../league-table/league-table.component';
import {
  ExtendedTeamDetails,
  Player,
  PlayerDetails,
  TeamStats,
} from 'src/app/types';
import { ApiService } from 'src/app/services/services/api.service';
import { forkJoin, Subscription } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-team-stats-dialog',
  templateUrl: './team-stats-dialog.component.html',
  styleUrls: ['./team-stats-dialog.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class TeamStatsDialogComponent implements OnInit, OnDestroy {
  teamStats!: TeamStats;
  teamForm: string[] = [];
  teamID!: number;
  detailedTeamStats?: ExtendedTeamDetails;
  detailedPlayerStats!: Array<Player>;
  loading: boolean = false;
  statsLoading: boolean = false;
  subscriptions = new Subscription();

  displayedColumns: string[] = ['photo', 'Name', 'Age', 'Position', 'Number'];
  columnsToDisplayWithExpand: string[] = [...this.displayedColumns, 'expand'];
  dataSource = this.detailedPlayerStats;
  expandedPlayer!: Player | null;
  playerStatsVisible: boolean = false;
  playerStats: PlayerDetails[] = [];

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
  }

  ngAfterContentInit() {
    this.getMoreDetails(this.teamID);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getMoreDetails(id: number) {
    this.loading = true;
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

  async getPlayerStats(playerID: number) {
    this.playerStats = [];
    this.statsLoading = true;
    await this.fetchPlayerStats(playerID);
  }

  expandedRowChange(player: Player, event: Event) {
    this.playerStatsVisible = false;
    this.expandedPlayer = this.expandedPlayer === player ? null : player;
    event.stopPropagation();
  }

  async fetchPlayerStats(id: number) {
    this.api.getPlayerDetailsById(id).subscribe((val: Array<PlayerDetails>) => {
      this.playerStats = val;
      this.statsLoading = false;
      this.playerStatsVisible = true;
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
