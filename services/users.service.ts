import { QwackerTokenParamsModel } from '../models/qwacker.model';
import { userCache } from '../pages/_app';
import { qwackerRequest } from './qwacker.service';

export function fetchUser({ token, id }: QwackerTokenParamsModel) {
  return qwackerRequest(`users/${id}`, token, { method: 'GET' });
}

export async function fetchCachedUser({ token, id }: QwackerTokenParamsModel) {
  if (userCache[id]) {
    return userCache[id];
  }
  const userData = await fetchUser({ token, id });
  userCache[id] = userData;
  return userData;
}
