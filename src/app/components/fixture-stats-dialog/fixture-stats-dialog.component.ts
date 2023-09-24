import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DialogData } from '../upcoming-fixtures/upcoming-fixtures.component';

@Component({
  selector: 'app-fixture-stats-dialog',
  templateUrl: './fixture-stats-dialog.component.html',
  styleUrls: ['./fixture-stats-dialog.component.scss'],
})
export class FixtureStatsDialogComponent implements OnInit {
  homeTeam!: any;
  awayTeam!: any;
  fixture!: any;
  leagueLogo!: string;
  leagues = [
    { name: 'laLiga', logo: 'assets/LaLiga-Logo.png' },
    {
      name: 'bundes',
      logo: 'assets/png-clipart-bundesliga-logo-bundesliga-logo-icons-logos-emojis-football.png',
    },
    { name: 'ligue1', logo: 'assets/Ligue1_logo.png' },
    { name: 'prem', logo: 'assets/premier-league-file.png' },
    { name: 'serieA', logo: 'assets/Italian-Serie-A-TIM-Logo-2019.png' },
    { name: 'UCL', logo: 'assets/UCL-logo.png' },
    { name: 'UEL', logo: 'assets/UEL-logo.png' },
  ];
  constructor(
    public dialogRef: MatDialogRef<FixtureStatsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log('DIALOG DATA::', this.data);
    this.homeTeam = this.data.homeTeam;
    this.awayTeam = this.data.awayTeam;
    this.fixture = this.data.fixture;

    this.leagues.forEach((league) => {
      if (this.data.league === league.name) {
        this.leagueLogo = league.logo;
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
