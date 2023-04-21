import { QwackerTokenParamsModel } from '../models/qwacker.model';
import { qwackerRequest } from './qwacker.service';

export function updateLikes({ token, id }: QwackerTokenParamsModel) {
  return qwackerRequest(`posts/${id}/likes`, token, {
    method: 'PUT',
  });
}

export function destroyLikes({ token, id }: QwackerTokenParamsModel) {
  return qwackerRequest(`posts/${id}/likes`, token, {
    method: 'DELETE',
  });
}
