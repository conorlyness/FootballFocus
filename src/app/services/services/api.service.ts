import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, retry, tap, throwError } from 'rxjs';
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

  LeagueIds = {
    prem: 39,
    serieA: 135,
    laLiga: 140,
    bundesliga: 78,
    ligue1: 61,
  };

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
    prem?: boolean,
    serieA?: boolean,
    laLiga?: boolean,
    bundes?: boolean,
    ligue1?: boolean
  ): Observable<LeagueTable> {
    let url: string = '';
    let leagueId: number;

    if (prem) {
      leagueId = this.LeagueIds.prem;
    } else if (serieA) {
      leagueId = this.LeagueIds.serieA;
    } else if (laLiga) {
      leagueId = this.LeagueIds.laLiga;
    } else if (bundes) {
      leagueId = this.LeagueIds.bundesliga;
    } else {
      leagueId = this.LeagueIds.ligue1;
    }

    url = `https://api-football-v1.p.rapidapi.com/v3/standings?season=${season}&league=${leagueId}`;

    return this.http.get<LeagueTable>(url, this.ApiFootballOptions).pipe(
      retry(2),
      catchError((error) => this.handleError(error))
    );
  }

  getCurrentFixtureRound(
    prem?: boolean,
    serieA?: boolean,
    laLiga?: boolean,
    bundes?: boolean,
    ligue1?: boolean
  ): Observable<string> {
    var url: string = '';

    if (prem) {
      url = this.urls.leagueRound.premierLeagueCurrentRoundUrl;
    } else if (serieA) {
      url = this.urls.leagueRound.serieALeagueCurrentRoundUrl;
    } else if (laLiga) {
      url = this.urls.leagueRound.laLigaLeagueCurrentRoundUrl;
    } else if (bundes) {
      url = this.urls.leagueRound.bundesligaLeagueCurrentRoundUrl;
    } else {
      url = this.urls.leagueRound.ligue1LeagueCurrentRoundUrl;
    }

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
    prem?: boolean,
    serieA?: boolean,
    laLiga?: boolean,
    bundes?: boolean,
    ligue1?: boolean
  ): Observable<Array<Fixture>> {
    console.log('round passed in : ', round);
    let leagueID;

    if (prem) {
      leagueID = this.LeagueIds.prem;
    } else if (serieA) {
      leagueID = this.LeagueIds.serieA;
    } else if (laLiga) {
      leagueID = this.LeagueIds.laLiga;
    } else if (bundes) {
      leagueID = this.LeagueIds.bundesliga;
    } else {
      leagueID = this.LeagueIds.ligue1;
    }

    let url: string = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${leagueID}&season=2022&round=${round}&timezone=Europe%2FLondon`;

    return this.http.get<ApiResponse>(url, this.ApiFootballOptions).pipe(
      map((resp: ApiResponse) => resp?.response),
      retry(2),
      catchError((error) => this.handleError(error))
    );
  }

  getLeagueNews(
    prem?: boolean,
    serieA?: boolean,
    laLiga?: boolean,
    bundes?: boolean,
    ligue1?: boolean
  ): Observable<Array<LeagueNews>> {
    let url: string = '';

    if (prem) {
      url = this.urls.leagueNews.premierLeagueNewsUrl;
    } else if (serieA) {
      url = this.urls.leagueNews.serieALeagueNewsUrl;
    } else if (laLiga) {
      url = this.urls.leagueNews.laLigaLeagueNewsUrl;
    } else if (bundes) {
      url = this.urls.leagueNews.bundesligaLeagueNewsUrl;
    } else {
      url = this.urls.leagueNews.ligue1LeagueNewsUrl;
    }

    return this.http.get<Array<LeagueNews>>(url, this.options).pipe(
      retry(2),
      catchError((error) => this.handleError(error))
    );
  }

  getAllHighlights(): Observable<Array<Highlight>> {
    const url = 'https://free-football-soccer-videos1.p.rapidapi.com/v1/';
    return this.http.get<Array<Highlight>>(url, this.highlightsOptions);
  }

  getLeagueTopScorers(
    prem?: boolean,
    serieA?: boolean,
    laLiga?: boolean,
    bundes?: boolean,
    ligue1?: boolean
  ): Observable<Array<PlayerDetails>> {
    let leagueID;

    if (prem) {
      leagueID = this.LeagueIds.prem;
    } else if (serieA) {
      leagueID = this.LeagueIds.serieA;
    } else if (laLiga) {
      leagueID = this.LeagueIds.laLiga;
    } else if (bundes) {
      leagueID = this.LeagueIds.bundesliga;
    } else {
      leagueID = this.LeagueIds.ligue1;
    }
    let url: string = `https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${leagueID}&season=2022`;
    return this.http.get<ApiResponse>(url, this.ApiFootballOptions).pipe(
      map((x: ApiResponse) => x?.response),
      retry(2),
      catchError((error) => this.handleError(error))
    );
  }

  getLast5Results(
    teamID: number,
    prem?: boolean,
    serieA?: boolean,
    laLiga?: boolean,
    bundes?: boolean,
    ligue1?: boolean
  ): Observable<Array<Last5>> {
    let leagueID;

    if (prem) {
      leagueID = this.LeagueIds.prem;
    } else if (serieA) {
      leagueID = this.LeagueIds.serieA;
    } else if (laLiga) {
      leagueID = this.LeagueIds.laLiga;
    } else if (bundes) {
      leagueID = this.LeagueIds.bundesliga;
    } else {
      leagueID = this.LeagueIds.ligue1;
    }

    var url: string = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${leagueID}&season=2022&team=${teamID}&last=5`;

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
    let url = `https://api-football-v1.p.rapidapi.com/v3/players?id=${id}&season=2022`;
    return this.http.get<ApiResponse>(url, this.ApiFootballOptions).pipe(
      map((x: ApiResponse) => x?.response),
      retry(2),
      catchError((error) => this.handleError(error))
    );
  }

  getTotalNumberOfGameWeeks(
    prem?: boolean,
    serieA?: boolean,
    laLiga?: boolean,
    bundes?: boolean,
    ligue1?: boolean
  ): Observable<Array<string>> {
    let leagueID;

    if (prem) {
      leagueID = this.LeagueIds.prem;
    } else if (serieA) {
      leagueID = this.LeagueIds.serieA;
    } else if (laLiga) {
      leagueID = this.LeagueIds.laLiga;
    } else if (bundes) {
      leagueID = this.LeagueIds.bundesliga;
    } else {
      leagueID = this.LeagueIds.ligue1;
    }

    let url = `https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds?league=${leagueID}&season=2022`;
    return this.http.get<ApiResponse>(url, this.ApiFootballOptions).pipe(
      map((x: ApiResponse) => x?.response),
      retry(2),
      catchError((error) => this.handleError(error))
    );
  }

  handleError(error: HttpErrorResponse) {
    return throwError(
      () => new Error(`Observable returned -> ${error.status}`)
    );
  }
}
