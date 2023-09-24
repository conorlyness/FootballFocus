import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/services/api.service';
import { LeagueData, LeagueTable } from 'src/app/types';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  @Input() leagueName!: string;
  selectedLeague!: LeagueData[];
  groupLoading: boolean = false;
  groupData: any[] = [];
  season: string = new Date().getFullYear().toString();
  groups: Array<any> = [
    { value: '0', displayName: 'A' },
    { value: '1', displayName: 'B' },
    { value: '2', displayName: 'C' },
    { value: '3', displayName: 'D' },
    { value: '4', displayName: 'E' },
    { value: '5', displayName: 'F' },
    { value: '6', displayName: 'G' },
    { value: '7', displayName: 'H' },
  ];

  displayedColumns: string[] = [
    'Position',
    'Team',
    'Games Played',
    'Won',
    'Lost',
    'Drew',
    'Goal Diff',
    'Points',
  ];
  currentGroup: any[] = [];
  group: string = '0';
  subscriptions = new Subscription();

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.selectedLeague = this.api.determineLeague(this.leagueName);
    this.getGroups();
  }

  //function to get all the groups
  getGroups() {
    this.groupLoading = true;
    this.groupData = [];
    this.subscriptions.add(
      this.api.getLeagueTable(this.season, this.selectedLeague).subscribe({
        next: (data: any) => {
          this.groupLoading = false;
          data.response[0].league.standings.forEach((element: LeagueTable) => {
            this.groupData.push(element);
          });
          this.currentGroup = this.groupData[0];
        },
        error: (error) => console.log('got an error: ', error),
      })
    );
  }

  getGroupStandings(group: any) {
    this.currentGroup = this.groupData[group];
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
