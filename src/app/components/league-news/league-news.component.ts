import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/services/api.service';
import { LeagueNews } from '../../types';

@Component({
  selector: 'app-league-news',
  templateUrl: './league-news.component.html',
  styleUrls: ['./league-news.component.scss'],
})
export class LeagueNewsComponent implements OnInit, OnDestroy {
  @Input() league!: string;
  news: LeagueNews[] = [];
  prem: boolean = false;
  serieA: boolean = false;
  laLiga: boolean = false;
  bundes: boolean = false;
  ligue1: boolean = false;
  isLoading: boolean = false;
  subscriptions = new Subscription();

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
    this.subscriptions.add(
      this.api
        .getLeagueNews(
          this.prem,
          this.serieA,
          this.laLiga,
          this.bundes,
          this.ligue1
        )
        .subscribe({
          next: (data: any) => {
            this.isLoading = false;
            data.forEach((article: LeagueNews) => {
              this.news.push(article);
            });
          },
          error: (error) => console.log('got an error: ', error),
        })
    );
  }

  openArticle(url: string) {
    window.open(url, '_blank');
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
