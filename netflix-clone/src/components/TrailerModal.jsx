import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { getTrailerKey } from '../services/tmdb';

export default function TrailerModal({ open, type, id, onClose }) {
  const [key, setKey] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    if (open && type && id) {
      setLoading(true);
      getTrailerKey(type, id)
        .then((k) => active && setKey(k))
        .finally(() => active && setLoading(false));
    } else {
      setKey(null);
    }
    return () => {
      active = false;
    };
  }, [open, type, id]);

  if (!open) return null;

  return createPortal(
    <div className="trailer-modal">
      <div className="trailer-box">
        <button onClick={onClose} className="close-btn">Close</button>
        {loading ? (
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', color: 'rgba(255,255,255,0.8)' }}>Loading trailer…</div>
        ) : key ? (
          <iframe
            style={{ width: '100%', height: '100%' }}
            src={`https://www.youtube.com/embed/${key}?autoplay=1&controls=1`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', color: 'rgba(255,255,255,0.8)' }}>No trailer found.</div>
        )}
      </div>
    </div>,
    document.body
  );
}
