import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-la-liga',
  templateUrl: './la-liga.component.html',
  styleUrls: ['./la-liga.component.scss'],
})
export class LaLigaComponent implements OnInit {
  leagueName: string = 'laLiga';

  constructor() {}

  ngOnInit(): void {}
}
