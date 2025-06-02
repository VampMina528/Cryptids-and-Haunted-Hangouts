import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/spooky.css';

const Wikipedia = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[][]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type'); // 'cryptid' or 'haunted'

  const placeholder =
    type === 'cryptid'
      ? 'Search for a cryptid (e.g., Mothman, Chupacabra)...'
      : type === 'haunted'
      ? 'Search for a haunted place (e.g., Rucker Mansion)...'
      : 'Search Wikipedia...';

  const headerTitle =
    type === 'cryptid'
      ? 'Explore Cryptid Lore'
      : type === 'haunted'
      ? 'Discover Haunted Hangouts'
      : 'Search the Unknown';

  const handleSearch = async (term: string) => {
    if (!term) {
      setResults([]);
      return;
    }

    try {
      const res = await fetch(
        `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=${term}`
      );
      const data = await res.json();
      setResults([data[1], data[3]]); // [titles[], urls[]]
    } catch (err) {
      console.error('Error fetching Wikipedia data:', err);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      handleSearch(query);
    }, 300); // debounce

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    inputRef.current?.focus();

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [navigate]);

  return (
    <div className="full-page">
      <h2 className="flicker">{headerTitle}</h2>

      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />

      <ul className="search-results">
        {results[0]?.map((title, i) => (
          <li key={i}>
            <a
              href={results[1][i]}
              target="_blank"
              rel="noopener noreferrer"
              className="link-button"
            >
              {title}
            </a>
          </li>
        ))}
      </ul>

      <button onClick={() => navigate('/')} className="view-detail-button">
        ← Return to Home
      </button>
    </div>
  );
};

export default Wikipedia;
