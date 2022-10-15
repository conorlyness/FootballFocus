import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { urls } from '../../serviceUrls';
import { LeagueTable } from 'src/app/types';

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

    return this.http.get<LeagueTable>(url, this.options);
  }

  getLeagueFixtures(
    prem?: boolean,
    serieA?: boolean,
    laLiga?: boolean,
    bundes?: boolean,
    ligue1?: boolean
  ) {
    var url: string = '';

    if (prem) {
      url = this.urls.leagueFixtures.premierLeagueFixturesUrl;
    } else if (serieA) {
      url = this.urls.leagueFixtures.serieALeagueFixturesUrl;
    } else if (laLiga) {
      url = this.urls.leagueFixtures.laLigaLeagueFixturesUrl;
    } else if (bundes) {
      url = this.urls.leagueFixtures.bundesligaLeagueFixturesUrl;
    } else {
      url = this.urls.leagueFixtures.ligue1LeagueResultsUrl;
    }

    return this.http.get(url, this.options);
  }

  getLeagueResults(
    prem?: boolean,
    serieA?: boolean,
    laLiga?: boolean,
    bundes?: boolean,
    ligue1?: boolean
  ) {
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

    return this.http.get(url, this.options);
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
    var url: string = '';
    console.log('round passed in : ', round);

    if (prem) {
      url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${this.LeagueIds.prem}&season=2022&round=${round}&timezone=Europe%2FLondon`;
    } else if (serieA) {
      url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${this.LeagueIds.serieA}&season=2022&round=${round}&timezone=Europe%2FLondon`;
    } else if (laLiga) {
      url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${this.LeagueIds.laLiga}&season=2022&round=${round}&timezone=Europe%2FLondon`;
    } else if (bundes) {
      url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${this.LeagueIds.bundesliga}&season=2022&round=${round}&timezone=Europe%2FLondon`;
    } else {
      url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${this.LeagueIds.ligue1}&season=2022&round=${round}&timezone=Europe%2FLondon`;
    }

    return this.http.get(url, this.ApiFootballOptions);
  }

  getLeagueNews(
    prem?: boolean,
    serieA?: boolean,
    laLiga?: boolean,
    bundes?: boolean,
    ligue1?: boolean
  ) {
    var url: string = '';

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
    var url: string = '';

    if (prem) {
      url = `https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${this.LeagueIds.prem}&season=2022`;
    } else if (serieA) {
      url = `https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${this.LeagueIds.serieA}&season=2022`;
    } else if (laLiga) {
      url = `https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${this.LeagueIds.laLiga}&season=2022`;
    } else if (bundes) {
      url = `https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${this.LeagueIds.bundesliga}&season=2022`;
    } else {
      url = `https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${this.LeagueIds.ligue1}&season=2022`;
    }

    return this.http.get(url, this.ApiFootballOptions);
  }
}
