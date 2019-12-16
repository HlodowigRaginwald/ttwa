import React from 'react';
import PropTypes from 'prop-types';
import style from './Album.module.scss';
import noImg from '../assets/no_img.png';

export default function Album({
  name,
  image,
  artists,
  releaseDate,
  totalTracks,
  spotifyUrl,
}) {
  return (
    <div className={style.album}>
      <img src={image} alt={name} className={style.image} />
      <section className={style.section}>
        <h3 className={style.name}>
          {name}
        </h3>
        <span className={style.artists}>
          {artists}
        </span>
        <span className={style.releaseDate}>
          {releaseDate}
        </span>
        <span className={style.tracks}>
          {totalTracks.toLocaleString()}
          &nbsp;
          tracks
        </span>
      </section>
      {
        spotifyUrl.length
        && (
        <a
          href={spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={style.spotifyLink}
        >
            Preview on Spotify
        </a>
        )
      }
    </div>
  );
}

Album.propTypes = {
  name: PropTypes.string.isRequired,
  artists: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  totalTracks: PropTypes.number.isRequired,
  spotifyUrl: PropTypes.string,
  image: PropTypes.string,
};

Album.defaultProps = {
  image: noImg,
  spotifyUrl: '',
};
