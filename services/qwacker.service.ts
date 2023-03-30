const BASE_URL = process.env.API_BASE_URL;

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

export function fetchUser({ token, userId }: { token: string; userId: string }) {
  return qwackerRequest(`users/${userId}`, token, { method: 'GET' });
}
