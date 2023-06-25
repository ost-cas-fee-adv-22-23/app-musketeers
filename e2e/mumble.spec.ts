import { test, expect } from '@playwright/test';
import { E2E_API_POSTS, E2E_API_BASE, getRandomMumbleText } from './custom.commands';

test.describe('Create, Like, Comment and Delete a new Mumble', () => {
  test('New Mumble - Happy Flow', async ({ page }) => {
    let newlyCreatedMumbleId = '';

    // ENABLE API INTERCEPTIONS
    await page.route('**/*', (route) => {
      route.continue();
    });

    await page.goto('/');

    // CREATE A NEW MUMBLE
    const mumbleText = getRandomMumbleText();

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
    await page.waitForSelector('text=' + mumbleText);

    const createdMumble = page.getByTestId(newlyCreatedMumbleId);

    await expect(createdMumble).toBeDefined();

    // LIKE THE NEWLY CREATED MUMBLE
    const createdMumbleLikeButton = createdMumble.getByTestId('button-mumble-like');
    await createdMumbleLikeButton.click();

    await expect(createdMumbleLikeButton).toHaveText('1 Likes');

    // ROUTE TO COMMENT / REPLY SECTION
    const createdMumbleCommentButton = createdMumble.getByTestId('button-mumble-comment');
    await createdMumbleCommentButton.click();

    await page.waitForURL('**/mumble/*');

    // REPLY TO NEWLY CREATED MUMBLE
    let newlyCreatedCommentId = '';
    const mumbleTextComment = getRandomMumbleText();

    await page.waitForSelector('textarea[data-testId="input-mumble"]');
    await page.getByTestId('input-mumble').fill(mumbleTextComment);
    await page.waitForSelector('button[data-testId="button-create-mumble"]');
    await page.getByTestId('button-create-mumble').click();

    await page.waitForResponse(async (response) => {
      if (response.url() === E2E_API_BASE + E2E_API_POSTS + '/' + newlyCreatedMumbleId) {
        const data = await response.json();
        newlyCreatedCommentId = data.id;

        return true;
      }

      return false;
    });
    await page.waitForSelector('text=' + mumbleTextComment);
    const createdComment = page.getByTestId(newlyCreatedCommentId);

    await expect(createdComment).toBeDefined();

    // DELETE NEWLY CREATED MUMBLE
    const deleteButton = page.getByTestId('button-mumble-delete');
    await deleteButton.click();

    await page.waitForResponse(async (response) => {
      return response.url() === E2E_API_BASE + E2E_API_POSTS + '/' + newlyCreatedMumbleId;
    });

    await page.waitForURL('**');

    const title = page.getByTestId('heading');
    await expect(title).toBeDefined();
  });
});
