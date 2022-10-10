import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  tabIndex = 0;
  constructor() {}
  ngOnInit(): void {}

  changeTab(event: any) {
    console.log(event.index);
    this.tabIndex = event.index;
  }
}
