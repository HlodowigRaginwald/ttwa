import React from 'react';
import PropTypes from 'prop-types';
import style from './Stars.module.scss';

export default function Stars({
  value,
}) {
  return (
    <span className={style.stars}>
      <i className={`fas fa-star ${style.star} ${value > 0 ? style.active : ''}`} />
      <i className={`fas fa-star ${style.star} ${value >= 1 ? style.active : ''}`} />
      <i className={`fas fa-star ${style.star} ${value >= 2 ? style.active : ''}`} />
      <i className={`fas fa-star ${style.star} ${value >= 3 ? style.active : ''}`} />
      <i className={`fas fa-star ${style.star} ${value >= 4 ? style.active : ''}`} />
    </span>
  );
}

Stars.propTypes = {
  value: PropTypes.number.isRequired,
};
