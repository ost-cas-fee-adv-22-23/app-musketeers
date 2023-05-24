import { enableFetchMocks } from 'jest-fetch-mock';
enableFetchMocks();
import { qwackerRequest } from '../../services/qwacker.service';
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

global.console.error = jest.fn();
fetchMock.mockResponse(JSON.stringify({ foo: 'bar' }));

describe('qwacker.service', () => {
  test('qwackerRequest get with token', async () => {
    const response = await qwackerRequest('endpoint', 'test token', { method: 'GET' });

    expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/endpoint`, {
      headers: {
        Authorization: 'Bearer test token',
        'content-type': 'application/json',
      },
      method: 'GET',
    });
    expect(response).toStrictEqual({ foo: 'bar' });
  });
  test('qwackerRequest failed get with token', async () => {
    fetchMock.mockRejectOnce(() => Promise.reject('API is down'));
    const response = await qwackerRequest('endpoint', 'test token', { method: 'GET' });

    expect(fetch).toHaveBeenCalledWith(`${BASE_URL}/endpoint`, {
      headers: {
        Authorization: 'Bearer test token',
        'content-type': 'application/json',
      },
      method: 'GET',
    });
    expect(response).toStrictEqual(undefined);
  });
});
