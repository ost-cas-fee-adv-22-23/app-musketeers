import { getClientToken, getUserId } from '../helpers/session.helpers';

describe('common.helpers', () => {
  test('getClientToken', () => {
    expect(
      getClientToken({
        token: {},
        user: {},
        expires: '2021-08-24T15:00:00.000Z',
      })
    ).toStrictEqual(undefined);
    expect(
      getClientToken({
        token: {
          accessToken: '123',
        },
        user: {},
        expires: '2021-08-24T15:00:00.000Z',
      })
    ).toStrictEqual('123');
    expect(
      getClientToken({
        token: {
          accessToken: {
            foo: 'bar',
          },
        },
        user: {},
        expires: '2021-08-24T15:00:00.000Z',
      })
    ).toStrictEqual({ foo: 'bar' });
  });
  test('getUserId', () => {
    expect(
      getUserId({
        token: {},
        user: {},
        expires: '2021-08-24T15:00:00.000Z',
      })
    ).toStrictEqual(undefined);
    expect(
      getUserId({
        token: {
          user: 'foo',
        },
        user: {},
        expires: '2021-08-24T15:00:00.000Z',
      })
    ).toStrictEqual(undefined);
    expect(
      getUserId({
        token: {
          user: {
            id: '123',
          },
        },
        user: {},
        expires: '2021-08-24T15:00:00.000Z',
      })
    ).toStrictEqual('123');
  });
});
