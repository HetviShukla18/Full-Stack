import { imageBase, getItemType } from '../services/tmdb';

export default function MovieCard({ item, onClick }) {
  const title = item.title || item.name || item.original_name;
  const poster = item.backdrop_path || item.poster_path;
  const type = getItemType(item);

  return (
    <button onClick={() => onClick?.(item)} className="movie-card">
      {poster ? (
        <img src={`${imageBase.w500}${poster}`} alt={title} loading="lazy" />
      ) : (
        <div className="skeleton-card" />
      )}
      <div className="meta">
        <div className="title">{title}</div>
        <div className="type">{type}</div>
      </div>
    </button>
  );
}
