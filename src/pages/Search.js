import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { searchArtistByQuery } from '../spotifyApi';
import Artist from '../components/Artist';
import style from './Search.module.scss';

let queryTimeout;

export default function Home() {
  const location = useLocation();
  const history = useHistory();

  const qSearch = new URLSearchParams(location.search).get('q');

  const inputSearch = useRef(null);
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  const [queryInput, setQueryInput] = useState(qSearch || '');
  const [query, setQuery] = useState(queryInput);

  const [queryLoading, setQueryLoading] = useState(false);
  const [moreItemsLoading, setMoreItemsLoading] = useState(false);

  const updateItems = async () => {
    setQueryLoading(true);
    try {
      const artists = await searchArtistByQuery(query);
      setItems(artists.items);
      setTotalItems(artists.total);
    } catch (e) {
      // TODO do something with the error
    }
    setQueryLoading(false);
  };

  const loadMoreItems = async () => {
    if (items.length >= totalItems) {
      return;
    }
    setMoreItemsLoading(true);
    try {
      const artists = await searchArtistByQuery(query, {
        offset: items.length,
      });
      setItems(items.concat(artists.items));
    } catch (e) {
      // TODO do something with the error
    }
    setMoreItemsLoading(false);
  };

  const updateSearchParams = () => {
    if (qSearch === query) {
      return;
    }

    if (!qSearch && query === '') {
      return;
    }

    const param = new URLSearchParams(location.search);

    if (query === '' && qSearch) {
      param.delete('q');
      history.push({
        search: '',
      });
      return;
    }
    param.set('q', query);
    history.push({
      search: `?${param.toString()}`,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    setQuery(queryInput);
  };

  useEffect(() => {
    updateSearchParams();
    if (query === '') {
      setItems([]);
      setTotalItems(0);
    } else {
      updateItems();
    }
  }, [query]);

  useEffect(() => {
    clearTimeout(queryTimeout);
    queryTimeout = setTimeout(() => {
      setQuery(queryInput);
    }, 500);
    return () => clearTimeout(queryTimeout);
  }, [queryInput]);

  useEffect(() => {
    setQueryInput(qSearch || '');
    setQuery(qSearch || '');
  }, [qSearch]);

  useEffect(() => {
    inputSearch.current.focus();
  }, []);

  const displayResult = () => {
    if (query === '') {
      return (
        <p className={style.info}>
          You must type something ...
        </p>
      );
    }

    if (items.length === 0 && !queryLoading) {
      return (
        <p className={style.info}>
          No result found
          <span role="img" aria-label="not found">🧐</span>
        </p>
      );
    }

    return (
      <ul className={style.list}>
        {items.map((item) => (
          <li key={item.id}>
            <Artist
              image={(item.images[1] && item.images[1].url)
                 || (item.images[0] && item.images[0].url)}
              followers={item.followers.total}
              name={item.name}
              popularity={item.popularity}
              id={item.id}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={style.search}>
      <form onSubmit={(e) => submit(e)} className={style.form}>
        <input
          type="text"
          placeholder="Search for an artist..."
          onChange={(e) => setQueryInput(e.target.value)}
          value={queryInput}
          className={style.input}
          ref={inputSearch}
          required
        />
        <button
          className={style.button}
          type="submit"
          aria-label="search"
        >
          {queryLoading
            ? (<i className="fas fa-spinner fa-spin" />)
            : (<i className="fas fa-search" />)}

        </button>
      </form>
      {displayResult()}
      {totalItems > items.length
        && (
        <button
          type="button"
          className={style.loadMore}
          disabled={moreItemsLoading}
          onClick={() => loadMoreItems()}
        >
          {
            moreItemsLoading
              ? (<i className="fas fa-spinner fa-spin" />)
              : (<i className="fas fa-plus" />)
          }
          &nbsp;
          See more
        </button>
        )}

    </div>
  );
}
