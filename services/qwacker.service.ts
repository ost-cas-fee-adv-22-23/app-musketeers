import {
  QwackerCreateParamsModel,
  QwackerPostsParamModel,
  QwackerSearchParamsModel,
  QwackerTokenParamsModel,
  QwackModel,
  QwackModelDecorated,
} from '../models/qwacker.model';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function qwackerRequest(endpoint: string, jwtToken: string, options: { [key: string]: string }) {
  const url = BASE_URL + '/' + endpoint;
  const res = await fetch(url, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
    ...options,
  });

  if (res.status !== 200) {
    //TODO DO ERROR HANDLING
    return;
  }

  return res.json();
}

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

export async function fetchPostsWithUsers({ token, limit = 10, offset = 0, creator = '' }: QwackerPostsParamModel) {
  const { data } = await fetchPosts({ token, offset, limit, creator });
  return await fetchPopulatedPosts(data, token);
}

export async function fetchLikedPostsWithUsers({ token, id }: QwackerTokenParamsModel) {
  const { data } = await searchPosts(token, { likedBy: [id] });
  return await fetchPopulatedPosts(data, token);
}

export async function fetchRepliesWithUser({ token, id }: QwackerTokenParamsModel): Promise<QwackModelDecorated[]> {
  const replies = await fetchReplies({ token, id });
  return await fetchPopulatedPosts(replies, token);
}

export function fetchSinglePost({ token, id }: QwackerTokenParamsModel) {
  return qwackerRequest(`posts/${id}`, token, { method: 'GET' });
}

export function fetchUser({ token, id }: QwackerTokenParamsModel) {
  return qwackerRequest(`users/${id}`, token, { method: 'GET' });
}

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

export function searchPosts(token = '', searchParams: QwackerSearchParamsModel = {}) {
  return qwackerRequest(`posts/search`, token, { method: 'POST', body: JSON.stringify(searchParams) });
}

export function createPost(token = '', postParams: QwackerCreateParamsModel = {}) {
  return qwackerRequest('posts', token, { method: 'POST', body: JSON.stringify(postParams) });
}

export function destroyPost({ token = '', id = '' }: QwackerTokenParamsModel) {
  return qwackerRequest(`posts/${id}`, token, { method: 'DELETE' });
}

export function createReply(token = '', id = '', postParams: QwackerCreateParamsModel = {}) {
  return qwackerRequest(`posts/${id}`, token, { method: 'POST', body: JSON.stringify(postParams) });
}

export function fetchReplies({ token, id }: QwackerTokenParamsModel) {
  return qwackerRequest(`posts/${id}/replies`, token, { method: 'GET' });
}

async function fetchPopulatedPosts(data: QwackModel[], token: string) {
  return await Promise.all(
    data.map(async (post: QwackModel) => {
      const userData = await fetchUser({ token, id: post.creator });
      return { ...post, creatorData: userData };
    })
  );
}
