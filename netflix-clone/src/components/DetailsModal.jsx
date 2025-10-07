import { createPortal } from 'react-dom';
import { imageBase, getItemType } from '../services/tmdb';

export default function DetailsModal({ open, item, onClose, onPlay }) {
  if (!open || !item) return null;

  const title = item.title || item.name || item.original_name;
  const poster = item.poster_path || item.backdrop_path;
  const type = getItemType(item);
  const date = item.release_date || item.first_air_date || '';
  const rating = typeof item.vote_average === 'number' ? item.vote_average.toFixed(1) : '';

  return createPortal(
    <div className="trailer-modal" /* reuse same overlay styles */>
      <div className="details-box">
        <button onClick={onClose} className="close-btn">Close</button>
        <div className="details-body">
          {poster ? (
            <img className="details-poster" src={`${imageBase.w500}${poster}`} alt={title} />
          ) : (
            <div className="details-poster" style={{ background: '#222' }} />
          )}
          <div className="details-info">
            <h3 className="details-title">{title}</h3>
            <div className="details-meta">
              {type && <span className="chip">{type}</span>}
              {date && <span className="chip">{date}</span>}
              {rating && <span className="chip">★ {rating}</span>}
            </div>
            {item.overview && <p className="details-overview">{item.overview}</p>}
            <div className="details-actions">
              <button className="btn btn-primary" onClick={() => onPlay(type, item.id)}>Play Trailer</button>
              <button className="btn btn-secondary" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
