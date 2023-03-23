const BASE_URL = process.env.API_BASE_URL;
export async function qwackerRequest(endpoint: string, jwtToken: string, options: { [key: string]: string }) {
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
