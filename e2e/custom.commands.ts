export const E2E_API_BASE = 'https://qwacker-api-http-prod-4cxdci3drq-oa.a.run.app';
export const E2E_API_POSTS = '/posts';
export const getRandomMumbleText = () => {
  return 'This is a playwright test with the id: ' + Math.round(Math.random() * 10000);
};
