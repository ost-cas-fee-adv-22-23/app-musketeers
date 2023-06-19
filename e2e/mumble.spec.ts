import { test } from '@playwright/test';
import { isMumbleCreated } from './custom-commands';

test.describe('Create, Like, Comment and Delete a new Mumble', () => {
  test('Create new Mumble', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('textarea[data-e2e="input-mumble"]');
    const mumbleText = 'This is a playwright test with the id: ' + Math.round(Math.random() * 10000);
    await page.fill('textarea[data-e2e="input-mumble"]', mumbleText);

    await page.waitForSelector('button[data-e2e="button-create-mumble"]');
    await page.click('button[data-e2e="button-create-mumble"]');

    await page.waitForResponse(async (response) => await isMumbleCreated(response));

    await expect(page.getByText(mumbleText)).toHaveText(mumbleText);
  });
});
