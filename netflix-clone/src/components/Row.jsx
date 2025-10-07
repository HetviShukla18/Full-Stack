import { useEffect, useRef, useState } from 'react';
import { fetchJSON } from '../services/tmdb';
import MovieCard from './MovieCard';

export default function Row({ title, requestUrl, onItemClick }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const scrollerRef = useRef(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchJSON(requestUrl)
      .then((data) => {
        if (!active) return;
        setItems(data.results || []);
      })
      .catch(() => {
        if (!active) return;
        setError('Failed to load');
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [requestUrl]);

  const scrollByAmount = (delta) => {
    scrollerRef.current?.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <section className="row">
      <div className="row-header">
        <div className="row-title">{title}</div>
        <div className="scroll-ctls">
          <button onClick={() => scrollByAmount(-600)} className="scroll-btn">◀</button>
          <button onClick={() => scrollByAmount(600)} className="scroll-btn">▶</button>
        </div>
      </div>
      {error && <div style={{ color: '#f87171', margin: '0 16px 8px' }}>{error}</div>}
      <div ref={scrollerRef} className="row-scroller">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))
        ) : (
          items.map((item) => (
            <MovieCard key={`${item.media_type || ''}-${item.id}`} item={item} onClick={onItemClick} />
          ))
        )}
      </div>
    </section>
  );
}
