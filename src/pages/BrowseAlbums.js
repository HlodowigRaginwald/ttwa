import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAlbumsByArtistId, getArtistInfoByArtistId } from '../spotifyApi';
import Album from '../components/Album';
import style from './BrowseAlbums.module.scss';

export default function BrowseAlbums() {
  const { artistId } = useParams();

  const [name, setName] = useState('');
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [moreItemsLoading, setMoreItemsLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);

  const loadMoreItems = async () => {
    if (items.length >= totalItems) {
      return;
    }
    setMoreItemsLoading(true);
    try {
      const artists = await getAlbumsByArtistId(artistId, {
        offset: items.length,
      });
      setItems(items.concat(artists.items));
    } catch (e) {
      // TODO do something with the error
    }
    setMoreItemsLoading(false);
  };

  useEffect(() => {
    async function getInfoArtist() {
      try {
        const info = await getArtistInfoByArtistId(artistId);
        setName(info.name);
      } catch (e) {
        // TODO do something with the error
      }
    }

    async function getAlbums() {
      try {
        const albums = await getAlbumsByArtistId(artistId);
        setItems(albums.items);
        setTotalItems(albums.total);
      } catch (e) {
        // TODO do something with the error
      }
    }

    Promise.all([
      getInfoArtist(),
      getAlbums(),
    ]).then(() => {
      setInitLoading(false);
    });
  }, [artistId]);

  if (initLoading) {
    return (
      <div className={style.browseAlbums}>
        <i className={`fas fa-spin fa-spinner ${style.loader}`} />
      </div>
    );
  }

  return (
    <div className={style.browseAlbums}>
      <header className={style.header}>
        <h1 className={style.title}>
          {name}
        </h1>
        <h2 className={style.subtitle}>
          Albums
        </h2>
      </header>
      <ul className={style.list}>
        {items.map((item) => (
          <li key={item.id}>
            <Album
              name={item.name}
              image={(item.images[1] && item.images[1].url)
                || (item.images[0] && item.images[0].url)}
              artists={item.artists.map((artist) => artist.name).join(', ')}
              releaseDate={item.release_date}
              totalTracks={item.total_tracks}
              spotifyUrl={item.external_urls.spotify}
            />
          </li>
        ))}
      </ul>
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
