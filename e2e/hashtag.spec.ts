import { test, expect } from '@playwright/test';
import { E2E_API_POSTS, E2E_API_BASE, getRandomMumbleHashTag } from './custom.commands';

test.describe('Hashtag Mumble Search', () => {
  test('Hashtag Search - Happy Flow', async ({ page }) => {
    let newlyCreatedMumbleId = '';

    // ENABLE API INTERCEPTIONS
    await page.route('**/*', (route) => {
      route.continue();
    });

    await page.goto('/');

    // CREATE A NEW MUMBLE
    const mumbleText = getRandomMumbleHashTag();

    await page.waitForSelector('textarea[data-testId="input-mumble"]');
    await page.getByTestId('input-mumble').fill(mumbleText);
    await page.getByTestId('button-create-mumble').click();

    await page.waitForResponse(async (response) => {
      if (response.url() === E2E_API_BASE + E2E_API_POSTS) {
        const data = await response.json();
        newlyCreatedMumbleId = data.id;

        return true;
      }

      return false;
    });

    await page.getByTestId('input-mumble').fill('');
    await page.waitForSelector(`[data-testid="${mumbleText}"]`);
    await page.getByTestId(`${mumbleText}`).click();

    const heading = page.getByTestId('heading');
    await expect(heading).toBeVisible();

    const searchedResult = page.getByTestId('hashtag-result');
    await expect(searchedResult).toHaveText(mumbleText);

    // DELETE NEWLY CREATED HASHTAG MUMBLE
    await page.getByTestId('button-mumble-delete').click();

    await page.waitForResponse(async (response) => {
      return response.url() === E2E_API_BASE + E2E_API_POSTS + '/' + newlyCreatedMumbleId;
    });

    await page.waitForURL('**');

    const title = page.getByTestId('heading');
    await expect(title).toBeDefined();
  });
});
