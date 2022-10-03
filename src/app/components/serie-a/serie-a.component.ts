import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-serie-a',
  templateUrl: './serie-a.component.html',
  styleUrls: ['./serie-a.component.scss'],
})
export class SerieAComponent implements OnInit {
  leagueName: string = 'serieA';

  constructor() {}

  ngOnInit(): void {}
}
