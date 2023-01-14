import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tabIndex = 0;
  constructor() {}
  ngOnInit(): void {}

  changeTab(event: MatTabChangeEvent) {
    this.tabIndex = event.index;
  }
}
