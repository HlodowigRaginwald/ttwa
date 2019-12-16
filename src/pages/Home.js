import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import style from './Home.module.scss';

export default function Home() {
  const history = useHistory();

  const inputSearch = useRef(null);
  const [search, setSearch] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const param = new URLSearchParams();
    param.set('q', search);
    history.push({
      pathname: '/search',
      search: `?${param.toString()}`,
    });
  };

  useEffect(() => {
    inputSearch.current.focus();
  }, []);

  return (
    <div className={style.home}>
      <form onSubmit={submit} className={style.form}>
        <input
          className={style.input}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for an artist..."
          ref={inputSearch}
          required
        />
        <button
          className={style.button}
          type="submit"
          aria-label="search"
        >
          <i className="fas fa-search" />
        </button>
      </form>
    </div>
  );
}
