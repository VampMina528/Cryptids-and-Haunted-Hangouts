import { useParams, useNavigate } from 'react-router-dom';
import { hauntedData } from '../data/hauntedData';
import { hauntedToCryptidMap } from '../data/hauntedToCryptidMap';
import '../styles/spooky.css';
import { useState, useEffect } from 'react';

const HauntedPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const haunted = hauntedData.find((place) => place.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [id]);

  if (!haunted) {
    return <div className="full-page flicker">Haunted location not found 👻</div>;
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % haunted.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? haunted.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="cryptid-detail-container full-page">
      <h1 className="flicker">{haunted.name}</h1>
      <h3>{haunted.location}</h3>

      <div className="image-carousel">
        {haunted.images.length > 1 && (
          <button className="arrow-button" onClick={handlePrevImage}>
            ⬅
          </button>
        )}
        <img
          src={`/icons/${haunted.images[currentImageIndex]}`}
          alt={`${haunted.name} view ${currentImageIndex + 1}`}
          className="cryptid-image"
        />
        {haunted.images.length > 1 && (
          <button className="arrow-button" onClick={handleNextImage}>
            ➡
          </button>
        )}
      </div>

      <p className="cryptid-description">{haunted.description}</p>

      {haunted.externalLink && (
        <a
          href={haunted.externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="external-link"
        >
          Learn more about this location
        </a>
      )}

      <div className="detail-buttons">
        <button onClick={() => navigate('/')} className="view-detail-button">
          ← Back to Homepage
        </button>
        <button
          onClick={() => navigate(`/cryptids/${hauntedToCryptidMap[haunted.id]}`)}
          className="view-detail-button"
        >
          Back to Cryptid →
        </button>
      </div>
    </div>
  );
};

export default HauntedPage;
