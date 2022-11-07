import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-la-liga',
  templateUrl: './la-liga.component.html',
  styleUrls: ['./la-liga.component.scss'],
})
export class LaLigaComponent implements OnInit {
  leagueName: string = 'laLiga';
  leagueImg: string = 'assets/laliga-v-1200x1200.png';

  constructor() {}

  ngOnInit(): void {}
}
