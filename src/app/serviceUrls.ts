const currentSeason = new Date().getFullYear().toString();
export let urls = {
  leagueNews: {
    //news urls
    premierLeagueNewsUrl:
      'https://football98.p.rapidapi.com/premierleague/news',
    serieALeagueNewsUrl: 'https://football98.p.rapidapi.com/seriea/news',
    laLigaLeagueNewsUrl: 'https://football98.p.rapidapi.com/laliga/news',
    bundesligaLeagueNewsUrl:
      'https://football98.p.rapidapi.com/bundesliga/news',
    ligue1LeagueNewsUrl:
      'https://football98.p.rapidapi.com/ligue1ubereats/news',
  },
  leagueRound: {
    //current round url
    premierLeagueCurrentRoundUrl: `https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds?league=39&season=${currentSeason}&current=true`,
    serieALeagueCurrentRoundUrl: `https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds?league=135&season=${currentSeason}&current=true`,
    laLigaLeagueCurrentRoundUrl: `https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds?league=140&season=${currentSeason}&current=true`,
    bundesligaLeagueCurrentRoundUrl: `https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds?league=78&season=${currentSeason}&current=true`,
    ligue1LeagueCurrentRoundUrl: `https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds?league=61&season=${currentSeason}&current=true`,
    championsLeagueCurrentRoundUrl: `https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds?league=2&season=${currentSeason}&current=true`,
    europaLeagueCurrentRoundUrl: `https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds?league=3&season=${currentSeason}&current=true`,
  },
};
