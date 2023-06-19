import { Response } from 'playwright-core';

const API_BASE = 'https://qwacker-api-http-prod-4cxdci3drq-oa.a.run.app';
const API_POSTS = '/posts';

export async function isMumbleCreated(response: Response) {
  console.log(response);
  return response.url().includes(API_BASE + API_POSTS) && response.status() === 201;
}
