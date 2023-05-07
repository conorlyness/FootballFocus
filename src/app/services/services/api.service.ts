import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { filter, map, Observable, of, retry, tap, throwError } from 'rxjs';
import { urls } from '../../serviceUrls';
import {
  LeagueTable,
  ApiResponse,
  Fixture,
  Last5,
  ExtendedTeamDetails,
  Player,
  Highlight,
  LeagueNews,
  PlayerDetails,
  LeagueData,
} from 'src/app/types';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  urls: any = urls;
  apiKey: string = '';

  options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': `${this.apiKey}`,
      'X-RapidAPI-Host': 'football98.p.rapidapi.com',
    },
  };

  //urls for API-FOOTBALL
  ApiFootballOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': `${this.apiKey}`,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    },
  };

  leagues: LeagueData[] = [
    {
      name: 'prem',
      value: false,
      newsUrl: this.urls.leagueNews.premierLeagueNewsUrl,
      leagueRound: this.urls.leagueRound.premierLeagueCurrentRoundUrl,
      id: 39,
    },
    {
      name: 'serieA',
      value: false,
      newsUrl: this.urls.leagueNews.serieALeagueNewsUrl,
      leagueRound: this.urls.leagueRound.serieALeagueCurrentRoundUrl,
      id: 135,
    },
    {
      name: 'laLiga',
      value: false,
      newsUrl: this.urls.leagueNews.laLigaLeagueNewsUrl,
      leagueRound: this.urls.leagueRound.laLigaLeagueCurrentRoundUrl,
      id: 140,
    },
    {
      name: 'bundes',
      value: false,
      newsUrl: this.urls.leagueNews.bundesligaLeagueNewsUrl,
      leagueRound: this.urls.leagueRound.bundesligaLeagueCurrentRoundUrl,
      id: 78,
    },
    {
      name: 'ligue1',
      value: false,
      newsUrl: this.urls.leagueNews.ligue1LeagueNewsUrl,
      leagueRound: this.urls.leagueRound.ligue1LeagueCurrentRoundUrl,
      id: 61,
    },
  ];

  currentSeason: string = (new Date().getFullYear() - 1).toString();

  //football highlights API
  highlightsOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': `${this.apiKey}`,
      'X-RapidAPI-Host': 'free-football-soccer-videos1.p.rapidapi.com',
    },
  };

  constructor(private http: HttpClient) {}

  getLeagueTable(
    season: string,
    leagues: LeagueData[]
  ): Observable<LeagueTable> {
    let url: string = '';
    let leagueId = this.determineLeagueId(leagues);
    url = `https://api-football-v1.p.rapidapi.com/v3/standings?season=${season}&league=${leagueId}`;

    return this.http.get<LeagueTable>(url, this.ApiFootballOptions).pipe(
      retry(2),
      catchError((error) => this.handleError(error))
    );
  }

  getCurrentFixtureRound(leagues: LeagueData[]): Observable<string> {
    var url: string = '';
    leagues.forEach((league: LeagueData) => {
      if (league.value) {
        url = league.leagueRound;
      }
    });

    return this.http.get<ApiResponse>(url, this.ApiFootballOptions).pipe(
      map((obj: ApiResponse) => obj?.response[0]),
      //use regex to get numbers from string i.e the current round
      map((val) => val.match(/\d/g).join('')),
      retry(2),
      catchError((error) => this.handleError(error))
    );
  }

  getFixturesByRound(
    round: number | string,
    leagues: LeagueData[]
  ): Observable<Array<Fixture>> {
    let leagueID = this.determineLeagueId(leagues);
    let url: string = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${leagueID}&season=${this.currentSeason}&round=${round}&timezone=Europe%2FLondon`;

    return this.http.get<ApiResponse>(url, this.ApiFootballOptions).pipe(
      map((resp: ApiResponse) => resp?.response),
      retry(2),
      catchError((error) => this.handleError(error))
    );
  }

  getLeagueNews(leagues: LeagueData[]): Observable<Array<LeagueNews>> {
    let url: string = '';
    leagues.forEach((league: LeagueData) => {
      if (league.value) {
        url = league.newsUrl;
      }
    });

    return this.http.get<Array<LeagueNews>>(url, this.options).pipe(
      retry(2),
      catchError((error) => this.handleError(error))
    );
  }

  getAllHighlights(): Observable<Array<Highlight>> {
    const url = 'https://free-football-soccer-videos1.p.rapidapi.com/v1/';
    const selectedHighlights = [
      'ENGLAND',
      'SPAIN',
      'FRANCE',
      'GERMANY',
      'ITALY',
      'CHAMPIONS',
      'SCOTLAND',
    ];

    const res = this.http
      .get<Array<Highlight>>(url, this.highlightsOptions)
      .pipe(
        map((highlights: Highlight[]) => {
          return highlights.filter((highlight) => {
            return selectedHighlights.some((competition) => {
              const highlightsComp = highlight.competition.name;
              return highlightsComp.includes(competition);
            });
          });
        })
      );
    return res;
  }

  getLeagueTopScorers(leagues: LeagueData[]): Observable<Array<PlayerDetails>> {
    let leagueID = this.determineLeagueId(leagues);
    let url: string = `https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${leagueID}&season=${this.currentSeason}`;
    return this.http.get<ApiResponse>(url, this.ApiFootballOptions).pipe(
      map((x: ApiResponse) => x?.response),
      retry(2),
      catchError((error) => this.handleError(error))
    );
  }

  getLast5Results(
    teamID: number,
    leagues: LeagueData[]
  ): Observable<Array<Last5>> {
    let leagueID = this.determineLeagueId(leagues);
    var url: string = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${leagueID}&season=${this.currentSeason}&team=${teamID}&last=5`;

    return this.http.get<ApiResponse>(url, this.ApiFootballOptions).pipe(
      map((x: ApiResponse) => x?.response),
      retry(2),
      catchError((error) => this.handleError(error))
    );
  }

  getTeamsDetails(id: number): Observable<ExtendedTeamDetails> {
    let url = `https://api-football-v1.p.rapidapi.com/v3/teams?id=${id}`;
    return this.http.get<ApiResponse>(url, this.ApiFootballOptions).pipe(
      map((x: ApiResponse) => x?.response[0]),
      retry(2),
      catchError((error) => this.handleError(error))
    );
  }

  getTeamsPlayers(id: number): Observable<Array<Player>> {
    let url = `https://api-football-v1.p.rapidapi.com/v3/players/squads?team=${id}`;
    return this.http.get<ApiResponse>(url, this.ApiFootballOptions).pipe(
      map((x: ApiResponse) => x?.response[0]?.players),
      retry(2),
      catchError((error) => this.handleError(error))
    );
  }

  getPlayerDetailsById(id: number): Observable<Array<PlayerDetails>> {
    let url = `https://api-football-v1.p.rapidapi.com/v3/players?id=${id}&season=${this.currentSeason}`;
    return this.http.get<ApiResponse>(url, this.ApiFootballOptions).pipe(
      map((x: ApiResponse) => x?.response),
      retry(2),
      catchError((error) => this.handleError(error))
    );
  }

  getTotalNumberOfGameWeeks(leagues: LeagueData[]): Observable<Array<string>> {
    let leagueID = this.determineLeagueId(leagues);
    let url = `https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds?league=${leagueID}&season=${this.currentSeason}`;
    return this.http.get<ApiResponse>(url, this.ApiFootballOptions).pipe(
      map((x: ApiResponse) => x?.response),
      retry(2),
      catchError((error) => this.handleError(error))
    );
  }

  determineLeague(league: string) {
    this.leagues.forEach((v) => (v.value = false));
    this.leagues.forEach((key: LeagueData) => {
      if (league === key.name) {
        key.value = true;
      }
    });
    return this.leagues;
  }

  determineLeagueId(leagues: LeagueData[]) {
    let leagueID;
    leagues.forEach((selectedLeague: LeagueData) => {
      if (selectedLeague.value) {
        leagueID = selectedLeague.id;
      }
    });
    return leagueID;
  }

  handleError(error: HttpErrorResponse) {
    return throwError(
      () => new Error(`Observable returned -> ${error.status}`)
    );
  }
}
