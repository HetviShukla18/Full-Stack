import { useState } from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Row from './components/Row';
import TrailerModal from './components/TrailerModal';
import DetailsModal from './components/DetailsModal';
import { requests } from './services/tmdb';

function App() {
  const [trailer, setTrailer] = useState({ open: false, type: null, id: null });
  const [details, setDetails] = useState({ open: false, item: null });

  const handlePlay = (type, id) => setTrailer({ open: true, type, id });
  const handleClose = () => setTrailer({ open: false, type: null, id: null });
  const handleCardClick = (item) => setDetails({ open: true, item });
  const handleCloseDetails = () => setDetails({ open: false, item: null });

  return (
    <div>
      <Navbar />
      <main style={{ paddingTop: 56 }}>
        <Banner onPlay={handlePlay} />

        <Row title="Trending Now" requestUrl={requests.trending('all')} onItemClick={handleCardClick} />
        <Row title="Top Rated" requestUrl={requests.topRated('movie')} onItemClick={handleCardClick} />
        <Row title="Now Playing" requestUrl={requests.nowPlaying()} onItemClick={handleCardClick} />
        <Row title="Popular" requestUrl={requests.popular('movie')} onItemClick={handleCardClick} />
        <Row title="Action Movies" requestUrl={requests.byGenre(28, 'movie')} onItemClick={handleCardClick} />
        <Row title="Comedies" requestUrl={requests.byGenre(35, 'movie')} onItemClick={handleCardClick} />
        <Row title="Horror" requestUrl={requests.byGenre(27, 'movie')} onItemClick={handleCardClick} />
        <Row title="Documentaries" requestUrl={requests.byGenre(99, 'movie')} onItemClick={handleCardClick} />
      </main>

      <TrailerModal open={trailer.open} type={trailer.type} id={trailer.id} onClose={handleClose} />
      <DetailsModal
        open={details.open}
        item={details.item}
        onClose={handleCloseDetails}
        onPlay={(type, id) => {
          setDetails({ open: false, item: null });
          handlePlay(type, id);
        }}
      />
    </div>
  );
}

export default App;
