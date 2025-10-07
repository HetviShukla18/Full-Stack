import { useEffect, useState } from 'react';
import { fetchJSON, imageBase, requests, getItemType } from '../services/tmdb';

export default function Banner({ onPlay }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await fetchJSON(requests.trending('all'));
        const results = data.results || [];
        const pick = results[Math.floor(Math.random() * results.length)];
        if (active) setItem(pick);
      } catch (e) {
        // ignore
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  if (!item) return <section className="banner" />;

  const title = item.title || item.name || item.original_name;
  const backdrop = item.backdrop_path || item.poster_path;
  const type = getItemType(item);

  return (
    <section className="banner">
      {backdrop && (
        <img src={`${imageBase.original}${backdrop}`} alt={title} className="bg" />
      )}
      <div className="overlay" />
      <div className="banner-content">
        <h2>{title}</h2>
        {item.overview && <p>{item.overview}</p>}
        <div className="btns">
          <button onClick={() => onPlay?.(type, item.id)} className="btn btn-primary">Play</button>
          <button className="btn btn-secondary">More Info</button>
        </div>
      </div>
    </section>
  );
}
