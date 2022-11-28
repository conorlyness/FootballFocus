import { test, expect } from '@playwright/test';

test.describe('navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Go to football focus before the tests run
    await page.goto('http://localhost:4200/');
  });

  test('Football focus has correct text on tabs for all 5 major leagues', async ({
    page,
  }) => {
    //locators
    const premierLeagueText = page.locator('.premierLeagueTab');
    const laLigaText = page.locator('.laLigaTab');
    const bundesligaText = page.locator('.bundesligaTab');
    const serieAText = page.locator('.serieATab');
    const ligue1Text = page.locator('.ligue1Tab');

    await expect.soft(premierLeagueText).toHaveText('Premier League');
    await expect.soft(laLigaText).toHaveText('La Liga');
    await expect.soft(bundesligaText).toHaveText('Bundesliga');
    await expect.soft(serieAText).toHaveText('Serie A');
    await expect.soft(ligue1Text).toHaveText('Ligue 1');
  });
});
