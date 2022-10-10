import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ligue1',
  templateUrl: './ligue1.component.html',
  styleUrls: ['./ligue1.component.scss'],
})
export class Ligue1Component implements OnInit {
  leagueName: string = 'ligue1';
  leagueImg: string = '../../../assets/Ligue1_logo.png';

  constructor() {}

  ngOnInit(): void {}
}
