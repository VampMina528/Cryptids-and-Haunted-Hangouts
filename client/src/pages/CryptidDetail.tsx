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

      <div className="image-carousel">
        <button onClick={prevImage}>&lt;</button>
        <img
          src={cryptid.images[imageIndex]}
          alt={`${cryptid.name} ${imageIndex + 1}`}
          className="cryptid-image"
        />
        <button onClick={nextImage}>&gt;</button>
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
                  📺 Watch Video {i + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <Link to="/" className="view-detail-button">🔙 Back to Homepage</Link>
      </div>
    </div>
  );
};

export default CryptidDetail;
