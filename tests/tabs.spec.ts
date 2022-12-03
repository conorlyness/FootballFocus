import { test, expect } from '@playwright/test';

//locators
const premierLeagueText = '.premierLeagueTab';
const laLigaText = '.laLigaTab';
const bundesligaText = '.bundesligaTab';
const serieAText = '.serieATab';
const ligue1Text = '.ligue1Tab';
const highlightsText = '.highlightsTab';

test.describe('navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Go to football focus before the tests run
    await page.goto('http://localhost:4200/');
  });

  test('Football focus has correct text on tabs for all 5 major leagues', async ({
    page,
  }) => {
    await expect
      .soft(page.locator(premierLeagueText))
      .toHaveText('Premier League');
    await expect.soft(page.locator(laLigaText)).toHaveText('La Liga');
    await expect.soft(page.locator(bundesligaText)).toHaveText('Bundesliga');
    await expect.soft(page.locator(serieAText)).toHaveText('Serie A');
    await expect.soft(page.locator(ligue1Text)).toHaveText('Ligue 1');
  });

  test('Football focus has correct text on highlight tab', async ({ page }) => {
    await expect(page.locator(highlightsText)).toHaveText('Highlights');
  });
});
