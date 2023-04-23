import {
  QwackerByHashtagParamModel,
  QwackerCreateParamsModel,
  QwackerPostsParamModel,
  QwackerSearchParamsModel,
  QwackerTokenParamsModel,
  QwackModel,
  QwackModelDecorated,
} from '../models/qwacker.model';
import { qwackerRequest } from './qwacker.service';
import { fetchCachedUser } from './users.service';

export function fetchPosts({
  token,
  limit = 10,
  offset = 0,
  newerThan = '',
  olderThan = '',
  creator = '',
}: QwackerPostsParamModel) {
  const searchParams = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
    newerThan,
    olderThan,
    creator,
  });
  return qwackerRequest(`posts?${searchParams.toString()}`, token, { method: 'GET' });
}

export function searchPosts(token = '', searchParams: QwackerSearchParamsModel = {}) {
  return qwackerRequest(`posts/search`, token, { method: 'POST', body: JSON.stringify(searchParams) });
}

export function createPost(token = '', postParams: QwackerCreateParamsModel) {
  const formData = getFormDataFromParams(postParams);

  return qwackerRequest('posts', token, { method: 'POST', body: formData });
}

export function destroyPost({ token = '', id = '' }: QwackerTokenParamsModel) {
  return qwackerRequest(`posts/${id}`, token, { method: 'DELETE' });
}

export function createReply(token = '', id = '', postParams: QwackerCreateParamsModel) {
  const formData = getFormDataFromParams(postParams);

  return qwackerRequest(`posts/${id}`, token, { method: 'POST', body: formData });
}

export function fetchReplies({ token, id }: QwackerTokenParamsModel) {
  return qwackerRequest(`posts/${id}/replies`, token, { method: 'GET' });
}

export async function fetchPostsWithUsers({ token, limit = 10, offset = 0, creator = '' }: QwackerPostsParamModel) {
  const { data } = await fetchPosts({ token, offset, limit, creator });
  return await fetchPopulatedPosts(data, token);
}

async function fetchPopulatedPosts(data: QwackModel[], token: string) {
  return await Promise.all(
    data.map(async (post: QwackModel) => {
      const userData = await fetchCachedUser({ token, id: post.creator });
      return { ...post, creatorData: userData };
    })
  );
}

export async function fetchLikedPostsWithUsers({ token, id }: QwackerTokenParamsModel) {
  const { data } = await searchPosts(token, { likedBy: [id] });
  return await fetchPopulatedPosts(data, token);
}

export async function fetchPostsByHashtags({ token, tags }: QwackerByHashtagParamModel) {
  const { data } = await searchPosts(token, { tags: tags });
  return await fetchPopulatedPosts(data, token);
}

export async function fetchRepliesWithUser({ token, id }: QwackerTokenParamsModel): Promise<QwackModelDecorated[]> {
  const replies = await fetchReplies({ token, id });
  return await fetchPopulatedPosts(replies, token);
}

export function fetchSinglePost({ token, id }: QwackerTokenParamsModel) {
  return qwackerRequest(`posts/${id}`, token, { method: 'GET' });
}

function getFormDataFromParams(params: QwackerCreateParamsModel) {
  const formData = new FormData();
  formData.append('text', params.text);

  if (params.image) {
    formData.append('image', params.image);
  }

  return formData;
}
