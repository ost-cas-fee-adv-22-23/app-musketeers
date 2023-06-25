import { test as setup } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

const authFile = 'playwright/.auth/user.json';
const USERNAME: string = process.env.ZITADEL_USERNAME || '';
const PASSWORD: string = process.env.ZITADEL_PASSWORD || '';

setup('authenticate', async ({ page }) => {
  await page.goto('/');
  await page.click('button[data-testId="button-login"]');
  await page.waitForEvent('domcontentloaded'); // Wait for the DOM content to be loaded

  await page.waitForSelector('#loginName');
  await page.fill('#loginName', USERNAME);

  await page.waitForSelector('#submit-button');
  await page.click('#submit-button');

  await page.waitForEvent('domcontentloaded'); // Wait for the DOM content to be loaded

  await page.waitForSelector('#password');
  await page.fill('#password', PASSWORD);

  await page.waitForSelector('#submit-button');
  await page.click('#submit-button');

  await page.waitForURL('http://localhost:3000');

  await page.context().storageState({ path: authFile });
});
