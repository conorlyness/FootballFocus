import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '',
      'X-RapidAPI-Host': 'football98.p.rapidapi.com',
    },
  };

  //table urls
  premierLeagueTableUrl: string =
    'https://football98.p.rapidapi.com/premierleague/table';
  serieALeagueTableUrl: string =
    'https://football98.p.rapidapi.com/seriea/table';
  laLigaLeagueTableUrl: string = 'https://football98.p.rapidapi.com/liga/table';
  bundesligaLeagueTableUrl: string =
    'https://football98.p.rapidapi.com/bundesliga/table';
  ligue1LeagueTableUrl: string =
    'https://football98.p.rapidapi.com/ligue1/table';

  //fixture urls
  premierLeagueFixturesUrl: string =
    'https://football98.p.rapidapi.com/premierleague/fixtures';
  serieALeagueFixturesUrl: string =
    'https://football98.p.rapidapi.com/seriea/fixtures';
  laLigaLeagueFixturesUrl: string =
    'https://football98.p.rapidapi.com/liga/fixtures';
  bundesligaLeagueFixturesUrl: string =
    'https://football98.p.rapidapi.com/bundesliga/fixtures';
  ligue1LeagueFixturesUrl: string =
    'https://football98.p.rapidapi.com/ligue1/fixtures';

  //result urls
  premierLeagueResultsUrl: string =
    'https://football98.p.rapidapi.com/premierleague/results';
  serieALeagueResultsUrl: string =
    'https://football98.p.rapidapi.com/seriea/results';
  laLigaLeagueResultsUrl: string =
    'https://football98.p.rapidapi.com/liga/results';
  bundesligaLeagueResultsUrl: string =
    'https://football98.p.rapidapi.com/bundesliga/results';
  ligue1LeagueResultsUrl: string =
    'https://football98.p.rapidapi.com/ligue1/results';

  //urls for API-FOOTBALL

  ApiFootballOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '',
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    },
  };

  //current round url
  premierLeagueCurrentRoundUrl: string =
    'https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds?league=39&season=2022&current=true';
  serieALeagueCurrentRoundUrl: string =
    'https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds?league=135&season=2022&current=true';
  laLigaLeagueCurrentRoundUrl: string =
    'https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds?league=140&season=2022&current=true';
  bundesligaLeagueCurrentRoundUrl: string =
    'https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds?league=78&season=2022&current=true';
  ligue1LeagueCurrentRoundUrl: string =
    'https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds?league=61&season=2022&current=true';

  //fixtures by round url
  LeagueIds = {
    prem: 39,
    serieA: 135,
    laLiga: 140,
    bundesliga: 78,
    ligue1: 61,
  };

  constructor(private http: HttpClient) {}

  getLeagueTable(
    prem?: boolean,
    serieA?: boolean,
    laLiga?: boolean,
    bundes?: boolean,
    ligue1?: boolean
  ) {
    var url: string = '';

    if (prem) {
      url = this.premierLeagueTableUrl;
    } else if (serieA) {
      url = this.serieALeagueTableUrl;
    } else if (laLiga) {
      url = this.laLigaLeagueTableUrl;
    } else if (bundes) {
      url = this.bundesligaLeagueTableUrl;
    } else {
      url = this.ligue1LeagueTableUrl;
    }

    return this.http.get(url, this.options);
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
      url = this.premierLeagueFixturesUrl;
    } else if (serieA) {
      url = this.serieALeagueFixturesUrl;
    } else if (laLiga) {
      url = this.laLigaLeagueFixturesUrl;
    } else if (bundes) {
      url = this.bundesligaLeagueFixturesUrl;
    } else {
      url = this.ligue1LeagueFixturesUrl;
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
      url = this.premierLeagueResultsUrl;
    } else if (serieA) {
      url = this.serieALeagueResultsUrl;
    } else if (laLiga) {
      url = this.laLigaLeagueResultsUrl;
    } else if (bundes) {
      url = this.bundesligaLeagueResultsUrl;
    } else {
      url = this.ligue1LeagueResultsUrl;
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
      url = this.premierLeagueCurrentRoundUrl;
    } else if (serieA) {
      url = this.serieALeagueCurrentRoundUrl;
    } else if (laLiga) {
      url = this.laLigaLeagueCurrentRoundUrl;
    } else if (bundes) {
      url = this.bundesligaLeagueCurrentRoundUrl;
    } else {
      url = this.ligue1LeagueCurrentRoundUrl;
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
}
