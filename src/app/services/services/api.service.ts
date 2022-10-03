import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  premierLeagueTableUrl: string =
    'https://football98.p.rapidapi.com/premierleague/table';
  serieALeagueTableUrl: string =
    'https://football98.p.rapidapi.com/seriea/table';
  laLigaLeagueTableUrl: string = 'https://football98.p.rapidapi.com/liga/table';
  bundesligaLeagueTableUrl: string =
    'https://football98.p.rapidapi.com/bundesliga/table';
  ligue1LeagueTableUrl: string =
    'https://football98.p.rapidapi.com/ligue1/table';

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
}
