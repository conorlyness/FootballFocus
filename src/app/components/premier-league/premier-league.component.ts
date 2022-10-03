import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/services/api.service';

@Component({
  selector: 'app-premier-league',
  templateUrl: './premier-league.component.html',
  styleUrls: ['./premier-league.component.scss'],
})
export class PremierLeagueComponent implements OnInit {
  leagueName: string = 'prem';

  constructor(private api: ApiService) {}

  ngOnInit(): void {}
}
