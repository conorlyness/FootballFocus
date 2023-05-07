import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/services/api.service';
import { LeagueData, LeagueNews } from '../../types';

@Component({
  selector: 'app-league-news',
  templateUrl: './league-news.component.html',
  styleUrls: ['./league-news.component.scss'],
})
export class LeagueNewsComponent implements OnInit, OnDestroy {
  @Input() league!: string;
  news: LeagueNews[] = [];
  isLoading: boolean = false;
  hasError: boolean = false;
  selectedLeague!: LeagueData[];
  subscriptions = new Subscription();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.selectedLeague = this.api.determineLeague(this.league);

    this.getLeagueNews();
  }

  getLeagueNews() {
    this.isLoading = true;
    this.hasError = false;
    this.subscriptions.add(
      this.api.getLeagueNews(this.selectedLeague).subscribe({
        next: (data: Array<LeagueNews>) => {
          this.isLoading = false;
          data.forEach((article: LeagueNews) => {
            this.news.push(article);
          });
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
          this.hasError = true;
        },
      })
    );
  }

  openArticle(url: string) {
    window.open(url, '_blank');
  }

  retryNews() {
    this.getLeagueNews();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
