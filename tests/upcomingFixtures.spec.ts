import { test, expect } from '@playwright/test';

//locators
const fixtureMatCard = '.fixtureCard';
const last5Dialog = '.last5Dialog';
const last5DialogCloseBtn = '.closeBtn';

test.describe('upcoming fixtures', () => {
  test.beforeEach(async ({ page }) => {
    // Go to football focus before the tests run
    await page.goto('http://localhost:4200/');
  });

  //using nth selector as there is 10 fixture mat cards all with the same class name, we only want to select the first one
  test('upcoming fixtures can be clicked on and a dialog appears with the teams last 5 results', async ({
    page,
  }) => {
    const firstFixture = page.locator(`${fixtureMatCard} >> nth=0`);

    //check the first fixture card is visible
    await expect(firstFixture).toBeVisible();

    //click it
    await firstFixture.click();

    const last5DialogContainer = page.locator(last5Dialog);

    //dialog should be open
    await expect(last5DialogContainer).toBeVisible();

    const closeBtn = page.locator(last5DialogCloseBtn);

    //close button should be visible
    await expect(closeBtn).toBeVisible();

    //close dialog
    await closeBtn.click();

    //check the dialog is closed
    const isDialogOpen = await last5DialogContainer.isVisible();

    await expect(isDialogOpen).toBeFalsy();
  });
});
