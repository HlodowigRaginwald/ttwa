import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './Artist.module.scss';
import noImg from '../assets/no_img.png';
import Stars from './Stars';


export default function Artist({
  name,
  id,
  image,
  followers,
  popularity,
}) {
  return (
    <Link to={`/${id}/albums`} className={style.artist}>
      <img src={image} alt={name} className={style.image} />
      <section className={style.section}>
        <h3 className={style.name}>{name}</h3>
        <span className={style.followers}>
          {followers.toLocaleString()}
        &nbsp;followers
        </span>
        <Stars value={popularity / 20} />
      </section>
    </Link>
  );
}

Artist.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  popularity: PropTypes.number.isRequired,
  image: PropTypes.string,
};

Artist.defaultProps = {
  image: noImg,
};
