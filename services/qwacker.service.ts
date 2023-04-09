import { QwackModel } from '../models/qwacker.model';

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
}: {
  token: string;
  limit?: number;
  offset?: number;
  newerThan?: string;
  olderThan?: string;
  creator?: string;
}) {
  const searchParams = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
    newerThan,
    olderThan,
    creator,
  });
  return qwackerRequest(`posts?${searchParams.toString()}`, token, { method: 'GET' });
}

export async function fetchPostsWithUsers({
  token,
  limit = 10,
  offset = 0,
}: {
  token: string;
  limit?: number;
  offset?: number;
  newerThan?: string;
  olderThan?: string;
  creator?: string;
}) {
  const { data } = await fetchPosts({ token, offset, limit });
  const newPosts = await Promise.all(
    data.map(async (post: QwackModel) => {
      const userData = await fetchUser({ token, userId: post.creator });
      return { ...post, creatorData: userData };
    })
  );
  return newPosts;
}

export function fetchUser({ token, userId }: { token: string; userId: string }) {
  return qwackerRequest(`users/${userId}`, token, { method: 'GET' });
}

export function updateLikes({ token, postId }: { token: string; postId: string }) {
  return qwackerRequest(`posts/${postId}/likes`, token, {
    method: 'PUT',
  });
}

export function destroyLikes({ token, postId }: { token: string; postId: string }) {
  return qwackerRequest(`posts/${postId}/likes`, token, {
    method: 'DELETE',
  });
}
