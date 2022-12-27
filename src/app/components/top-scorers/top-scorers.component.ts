import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/services/api.service';
import { PlayerDetails } from 'src/app/types';

@Component({
  selector: 'app-top-scorers',
  templateUrl: './top-scorers.component.html',
  styleUrls: ['./top-scorers.component.scss'],
})
export class TopScorersComponent implements OnInit, OnDestroy {
  @Input() league!: string;
  @Input() leagueImg!: string;
  playerData: PlayerDetails[] = [];
  prem: boolean = false;
  serieA: boolean = false;
  laLiga: boolean = false;
  bundes: boolean = false;
  ligue1: boolean = false;
  loading: boolean = false;
  subscriptions = new Subscription();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loading = true;
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
        .getLeagueTopScorers(
          this.prem,
          this.serieA,
          this.laLiga,
          this.bundes,
          this.ligue1
        )
        .subscribe({
          next: (val: Array<PlayerDetails>) => {
            //use slice so we get only the top three players
            let stats = val.slice(0, 3);

            stats.forEach((player: PlayerDetails) => {
              this.playerData.push({
                player: player.player,
                statistics: player.statistics,
              });
            });

            this.loading = false;
          },
          error: (error) => console.log('got an error: ', error),
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
