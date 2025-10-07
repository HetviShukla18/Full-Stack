import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div className="brand">N</div>
          <nav className="nav-links">
            <a href="#">Home</a>
            <a href="#">TV Shows</a>
            <a href="#">Movies</a>
            <a href="#">New & Popular</a>
            <a href="#">My List</a>
          </nav>
        </div>
        <div className="nav-right">
          <button style={{ background: 'transparent', color: '#fff', border: 0, cursor: 'pointer' }}>Search</button>
          <div style={{ width: 28, height: 28, borderRadius: 4, background: 'rgba(255,255,255,0.2)' }} />
        </div>
      </div>
    </header>
  );
}
