const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function qwackerRequest(endpoint: string, jwtToken: string, options: { [key: string]: string | FormData }) {
  const url = BASE_URL + '/' + endpoint;
  const headers: { [key: string]: string } = {
    'content-type': 'application/json',
    Authorization: `Bearer ${jwtToken}`,
  };

  if (options.body && typeof options.body !== 'string') {
    delete headers['content-type'];
  }

  const response = await fetch(url, {
    headers,
    ...options,
  });

  if (!response.ok) {
    const message = 'Something went wrong. Please try later again..';
    console.error(message);
  }

  if (response.status !== 200) {
    return;
  }

  return response.json();
}
