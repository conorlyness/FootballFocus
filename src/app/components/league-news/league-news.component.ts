import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/services/api.service';

@Component({
  selector: 'app-league-news',
  templateUrl: './league-news.component.html',
  styleUrls: ['./league-news.component.scss'],
})
export class LeagueNewsComponent implements OnInit {
  @Input() league!: string;
  news: any[] = [];
  prem: boolean = false;
  serieA: boolean = false;
  laLiga: boolean = false;
  bundes: boolean = false;
  ligue1: boolean = false;
  isLoading: boolean = false;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.isLoading = true;
    if (this.league === 'prem') {
      this.prem = true;
    } else if (this.league === 'serieA') {
      this.serieA = true;
    } else if (this.league === 'laLiga') {
      this.laLiga = true;
    } else if (this.league === 'bundes') {
      this.bundes = true;
    } else {
      this.ligue1 = true;
    }
    this.api
      .getLeagueNews(
        this.prem,
        this.serieA,
        this.laLiga,
        this.bundes,
        this.ligue1
      )
      .subscribe((data: any) => {
        this.isLoading = false;
        this.news = data;
        console.log('league news', data);
      });
  }

  openArticle(url: string) {
    window.open(url, '_blank');
  }
}
