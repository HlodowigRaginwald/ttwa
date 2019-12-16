import React from 'react';
import { useHistory } from 'react-router-dom';
import { checkHashAccessToken, redirectToSpotifyConnect } from '../spotifyConnect';
import style from './Login.module.scss';

export default function LoginSpotify() {
  const history = useHistory();

  if (checkHashAccessToken()) {
    history.push('/');
  }

  return (
    <div className={style.login}>
      <button className={style.button} onClick={redirectToSpotifyConnect} type="button">
        Connect Spotify
      </button>
    </div>
  );
}
