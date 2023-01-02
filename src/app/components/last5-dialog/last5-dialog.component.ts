import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Last5 } from 'src/app/types';
import { DialogData } from '../upcoming-fixtures/upcoming-fixtures.component';

@Component({
  selector: 'app-last5-dialog',
  templateUrl: './last5-dialog.component.html',
  styleUrls: ['./last5-dialog.component.scss'],
})
export class Last5DialogComponent implements OnInit {
  homeTeam!: Last5[];
  awayTeam!: Last5[];
  homeName!: string;
  awayName!: string;

  constructor(
    public dialogRef: MatDialogRef<Last5DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.homeName = this.data.homeTeamName;
      this.awayName = this.data.awayTeamName;
      this.homeTeam = this.data.homeTeam;
      this.awayTeam = this.data.awayTeam;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
