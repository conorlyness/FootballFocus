import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bundesliga',
  templateUrl: './bundesliga.component.html',
  styleUrls: ['./bundesliga.component.scss'],
})
export class BundesligaComponent implements OnInit {
  leagueName: string = 'bundes';

  constructor() {}

  ngOnInit(): void {}
}