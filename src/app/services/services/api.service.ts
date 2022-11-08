import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { urls } from '../../serviceUrls';
import { LeagueTable, LeagueResults } from 'src/app/types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  urls: any = urls;

  options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '',
      'X-RapidAPI-Host': 'football98.p.rapidapi.com',
    },
  };

  //urls for API-FOOTBALL
  ApiFootballOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '',
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
      'X-RapidAPI-Key': '',
      'X-RapidAPI-Host': 'free-football-soccer-videos.p.rapidapi.com',
    },
  };

  constructor(private http: HttpClient) {}

  getLeagueTable(
    prem?: boolean,
    serieA?: boolean,
    laLiga?: boolean,
    bundes?: boolean,
    ligue1?: boolean
  ): Observable<LeagueTable> {
    var url: string = '';

    if (prem) {
      url = this.urls.leagueTables.premierLeagueTableUrl;
    } else if (serieA) {
      url = this.urls.leagueTables.serieALeagueTableUrl;
    } else if (laLiga) {
      url = this.urls.leagueTables.laLigaLeagueTableUrl;
    } else if (bundes) {
      url = this.urls.leagueTables.bundesligaLeagueTableUrl;
    } else {
      url = this.urls.leagueTables.ligue1LeagueTableUrl;
    }

    return this.http.get<LeagueTable>(url, this.ApiFootballOptions);
  }

  getLeagueResults(
    prem?: boolean,
    serieA?: boolean,
    laLiga?: boolean,
    bundes?: boolean,
    ligue1?: boolean
  ): Observable<LeagueResults> {
    var url: string = '';

    if (prem) {
      url = this.urls.leagueResults.premierLeagueResultsUrl;
    } else if (serieA) {
      url = this.urls.leagueResults.serieALeagueResultsUrl;
    } else if (laLiga) {
      url = this.urls.leagueResults.laLigaLeagueResultsUrl;
    } else if (bundes) {
      url = this.urls.leagueResults.bundesligaLeagueResultsUrl;
    } else {
      url = this.urls.leagueResults.ligue1LeagueResultsUrl;
    }

    return this.http.get<LeagueResults>(url, this.options);
  }

  getCurrentFixtureRound(
    prem?: boolean,
    serieA?: boolean,
    laLiga?: boolean,
    bundes?: boolean,
    ligue1?: boolean
  ) {
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

    const resp = this.http.get(url, this.ApiFootballOptions);

    let currentRound$ = resp.pipe(map((obj: any) => obj?.response[0]));

    return currentRound$;
  }

  getFixturesByRound(
    round: any,
    prem?: boolean,
    serieA?: boolean,
    laLiga?: boolean,
    bundes?: boolean,
    ligue1?: boolean
  ) {
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

    return this.http.get(url, this.ApiFootballOptions);
  }

  getLeagueNews(
    prem?: boolean,
    serieA?: boolean,
    laLiga?: boolean,
    bundes?: boolean,
    ligue1?: boolean
  ) {
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

    return this.http.get(url, this.options);
  }

  getAllHighlights() {
    const url = 'https://free-football-soccer-videos.p.rapidapi.com/';
    return this.http.get(url, this.highlightsOptions);
  }

  getLeagueTopScorers(
    prem?: boolean,
    serieA?: boolean,
    laLiga?: boolean,
    bundes?: boolean,
    ligue1?: boolean
  ) {
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
    return this.http.get(url, this.ApiFootballOptions);
  }

  getLast5Results(
    teamID: number,
    prem?: boolean,
    serieA?: boolean,
    laLiga?: boolean,
    bundes?: boolean,
    ligue1?: boolean
  ) {
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

    return this.http.get(url, this.ApiFootballOptions);
  }
}
