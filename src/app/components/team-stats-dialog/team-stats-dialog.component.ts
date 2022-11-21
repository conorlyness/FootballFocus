import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from '../league-table/league-table.component';
import { TeamStats } from 'src/app/types';

@Component({
  selector: 'app-team-stats-dialog',
  templateUrl: './team-stats-dialog.component.html',
  styleUrls: ['./team-stats-dialog.component.scss'],
})
export class TeamStatsDialogComponent implements OnInit {
  teamStats!: TeamStats;

  constructor(
    public dialogRef: MatDialogRef<TeamStatsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.teamStats = this.data.stats;
  }

  ngOnInit(): void {
    console.log(this.teamStats);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
