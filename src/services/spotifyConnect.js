const { localStorage, location } = window;

export function isConnected() {
  return localStorage.getItem(process.env.REACT_APP_STORAGE_SPOTIFY_ACCESS_TOKEN) !== null;
}

export function redirectToSpotifyConnect() {
  function generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i += 1) {
      text += possible[Math.floor(Math.random() * possible.length)];
    }
    return text;
  }

  const state = generateRandomString(16);
  localStorage.setItem(process.env.REACT_APP_STORAGE_SPOTIFY_STATE, state);

  let urlAuth = process.env.REACT_APP_SPOTIFY_AUTH_URL;
  urlAuth += '?response_type=token';
  urlAuth += `&client_id=${encodeURIComponent(process.env.REACT_APP_SPOTIFY_CLIENTID)}`;
  urlAuth += `&state=${encodeURIComponent(state)}`;
  urlAuth += `&redirect_uri=${encodeURIComponent(process.env.REACT_APP_SPOTIFY_REDIRECT_URL)}`;

  location.href = urlAuth;
}

export function checkHashAccessToken() {
  const { hash } = location;
  if (!hash.startsWith('#')) {
    return false;
  }

  const params = hash.substr(1).split('&').reduce((result, current) => {
    const [key, value] = current.split('=');
    if (key && value) {
      Object.assign(result, {
        [key]: value,
      });
    }
    return result;
  }, {});

  if (!params.access_token || !params.state) {
    return false;
  }

  if (params.state !== localStorage.getItem(process.env.REACT_APP_STORAGE_SPOTIFY_STATE)) {
    return false;
  }

  localStorage.setItem(process.env.REACT_APP_STORAGE_SPOTIFY_ACCESS_TOKEN, params.access_token);
  localStorage.removeItem(process.env.REACT_APP_STORAGE_SPOTIFY_STATE);
  return true;
}
