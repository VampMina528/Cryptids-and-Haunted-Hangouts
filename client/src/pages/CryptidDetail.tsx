import { useParams, Link } from 'react-router-dom';
import { cryptids } from '../pages/CryptidPage';
import { useState } from 'react';
import '../styles/spooky.css';

const CryptidDetail = () => {
  const { id } = useParams<{ id: string }>();
  const cryptid = cryptids.find((c) => c.id === id);
  const [imageIndex, setImageIndex] = useState(0);

  if (!cryptid) return <p className="flicker">Cryptid not found in this realm 🕯</p>;

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % cryptid.images.length);
  };

  const prevImage = () => {
    setImageIndex((prev) => (prev - 1 + cryptid.images.length) % cryptid.images.length);
  };

  return (
    <div className="cryptid-detail-container">
      <h2 className="flicker">{cryptid.name}</h2>

      <div className="image-carousel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button onClick={prevImage} className="arrow-button">&#8592;</button>
        <img
          src={cryptid.images[imageIndex]}
          alt={`${cryptid.name} ${imageIndex + 1}`}
          className="cryptid-image"
          style={{ margin: '0 1rem' }}
        />
        <button onClick={nextImage} className="arrow-button">&#8594;</button>
      </div>

      <p><strong>Location:</strong> {cryptid.location}</p>
      <p><strong>Legend:</strong> {cryptid.description}</p>

      {cryptid.videos.length > 0 && (
        <div className="video-links">
          <h3>Related Videos</h3>
          <ul>
            {cryptid.videos.map((url, i) => (
              <li key={i}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {decodeURIComponent(new URL(url).pathname.split('/').pop() || `Watch Video ${i + 1}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <Link to="/" className="view-detail-button">&#8592; Back to Homepage</Link>
        <button className="view-detail-button" onClick={() => alert(`Show haunted location near ${cryptid.location}`)}>
          Haunted Hangout in this location &#8594;
        </button>
      </div>
    </div>
  );
};

export default CryptidDetail;
