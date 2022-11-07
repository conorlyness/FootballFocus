import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bundesliga',
  templateUrl: './bundesliga.component.html',
  styleUrls: ['./bundesliga.component.scss'],
})
export class BundesligaComponent implements OnInit {
  leagueName: string = 'bundes';
  leagueImg: string =
    'assets/png-clipart-bundesliga-logo-bundesliga-logo-icons-logos-emojis-football.png';

  constructor() {}

  ngOnInit(): void {}
}
