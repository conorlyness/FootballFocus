const axios = require("axios");
const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const apiKey = "0e7e7cff9dmshbb4979f6bf13213p1cddcajsn1dba8acdf9fc";
const headers = {
  "X-RapidAPI-Key": apiKey,
};
currentSeason = new Date().getFullYear().toString();
leagueIDs = {
  prem: 39,
  serieA: 135,
  laLiga: 140,
  bundes: 78,
  ligue1: 61,
};

describe("League Tables", () => {
  describe("Premier league table", () => {
    it("should return a successful response", async () => {
      try {
        const response = await axios.get(
          `https://api-football-v1.p.rapidapi.com/v3/standings?season=${currentSeason}&league=${leagueIDs.prem}`,
          { headers }
        );
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an("object");
        assert.strictEqual(
          response.data.response[0].league.name,
          "Premier League",
          "Ensure league name matches"
        );
      } catch (error) {
        throw new Error(error);
      }
    });
  });

  describe("Serie A league table", () => {
    it("should return a successful response", async () => {
      try {
        const response = await axios.get(
          `https://api-football-v1.p.rapidapi.com/v3/standings?season=${currentSeason}&league=${leagueIDs.serieA}`,
          { headers }
        );
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an("object");
        assert.strictEqual(
          response.data.response[0].league.name,
          "Serie A",
          "Ensure league name matches"
        );
      } catch (error) {
        throw new Error(error);
      }
    });
  });

  describe("La Liga league table", () => {
    it("should return a successful response", async () => {
      try {
        const response = await axios.get(
          `https://api-football-v1.p.rapidapi.com/v3/standings?season=${currentSeason}&league=${leagueIDs.laLiga}`,
          { headers }
        );
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an("object");
        assert.strictEqual(
          response.data.response[0].league.name,
          "La Liga",
          "Ensure league name matches"
        );
      } catch (error) {
        throw new Error(error);
      }
    });
  });

  describe("Bundesliga league table", () => {
    it("should return a successful response", async () => {
      try {
        const response = await axios.get(
          `https://api-football-v1.p.rapidapi.com/v3/standings?season=${currentSeason}&league=${leagueIDs.bundes}`,
          { headers }
        );
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an("object");
        assert.strictEqual(
          response.data.response[0].league.name,
          "Bundesliga",
          "Ensure league name matches"
        );
      } catch (error) {
        throw new Error(error);
      }
    });
  });

  describe("Ligue 1 league table", () => {
    it("should return a successful response", async () => {
      try {
        const response = await axios.get(
          `https://api-football-v1.p.rapidapi.com/v3/standings?season=${currentSeason}&league=${leagueIDs.ligue1}`,
          { headers }
        );
        expect(response.status).to.equal(200);
        expect(response.data).to.be.an("object");
        assert.strictEqual(
          response.data.response[0].league.name,
          "Ligue 1",
          "Ensure league name matches"
        );
      } catch (error) {
        throw new Error(error);
      }
    });
  });
});

describe("League current game weeks", () => {
  describe("Premier league current game week", () => {
    it("should return a successful response", async () => {
      try {
        const response = await axios.get(
          `https://api-football-v1.p.rapidapi.com/v3/fixtures/rounds?league=${leagueIDs.prem}&season=${currentSeason}&current=true`,
          { headers }
        );
        assert.strictEqual(response.status, 200, "Should be 200 status");
        console.log("Current game week::", response.data.response);
      } catch (error) {
        throw new Error(error);
      }
    });
  });
});
