import React from 'react';
import style from './Header.module.scss';

export default function () {
  return (
    <div className={style.header}>
      <a className={style.title} href="/">
        Spotify Artist Search
      </a>
    </div>
  );
}
