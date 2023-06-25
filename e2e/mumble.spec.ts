import { test, expect } from '@playwright/test';
import { getRandomMumbleText } from './custom.commands';

const API_BASE = 'https://qwacker-api-http-prod-4cxdci3drq-oa.a.run.app';
const API_POSTS = '/posts';

test.describe('Create, Like, Comment and Delete a new Mumble', () => {
  test('New Mumble', async ({ page }) => {
    await page.route('**/*', (route) => {
      route.continue();
    });

    await page.goto('/');
    await page.waitForSelector('textarea[data-e2e="input-mumble"]');
    const mumbleText = getRandomMumbleText();
    await page.fill('textarea[data-e2e="input-mumble"]', mumbleText);

    await page.waitForSelector('button[data-e2e="button-create-mumble"]');
    await page.click('button[data-e2e="button-create-mumble"]');

    await page.waitForResponse((response) => {
      return response.url() === API_BASE + API_POSTS;
    });

    await page.waitForTimeout(500);

    const createdMumble = page.getByText(mumbleText);

    await expect(createdMumble).toBeDefined();
    await expect(createdMumble).toHaveText(mumbleText);

    await page.fill('textarea[data-e2e="input-mumble"]', '');

    const createdMumbleLikeButton = await page.locator('.block > button:nth-child(2)').first();
    await createdMumbleLikeButton.click();
    await expect(createdMumbleLikeButton).toHaveText('1 Likes');

    const createdMumbleCommentButton = await page.locator('.block > button').first();
    await createdMumbleCommentButton.click();

    await page.waitForTimeout(1000);

    await page.waitForSelector('textarea[data-e2e="input-mumble"]');
    const mumbleTextComment = getRandomMumbleText();
    await page.fill('textarea[data-e2e="input-mumble"]', mumbleTextComment);
    await page.waitForSelector('button[data-e2e="button-create-mumble"]');
    await page.click('button[data-e2e="button-create-mumble"]');

    await page.waitForTimeout(1000);

    const createdComment = page.getByText(mumbleTextComment);

    await expect(createdComment).toBeDefined();
    await expect(createdComment).toHaveText(mumbleTextComment);

    const deleteButton = await page.getByRole('button', { name: 'Delete Mumble' });
    await deleteButton.click();

    await page.waitForTimeout(1000);

    const title = page.getByRole('button', { name: 'Willkommen auf Mumble' });
    await expect(title).toBeDefined();
  });
});
