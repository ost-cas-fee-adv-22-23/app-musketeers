import { expect, test } from '@playwright/test';

test.describe('Check Profile-Page', () => {
  test('Check if data is correctly rendered on personal page', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('button-page-profile').click();
    await page.waitForURL('**/profile/me');

    // Check for correct title
    const profilePageTitle = page.getByTestId('profile-page-title');
    await expect(profilePageTitle).toHaveText('Samir Mumic');

    // Check for correct username
    const profilePageUsername = page.getByTestId('profile-page-username');
    await expect(profilePageUsername).toHaveText('musketeer-e2e');

    // Check for created mumbles
    const mumblesCreated = page.getByTestId('mumbles');
    await expect(mumblesCreated).toBeDefined();

    const profileTabSwitchLiked = page.getByTestId('profile-page-likes');
    await profileTabSwitchLiked.click();

    // Check for liked mumbles
    const mumblesLiked = await page.getByTestId('mumbles').all();
    await expect(mumblesLiked).toHaveLength(0);
  });
});
