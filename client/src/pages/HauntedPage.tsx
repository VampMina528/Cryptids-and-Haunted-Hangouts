import { useParams } from 'react-router-dom';
import { hauntedPlaces } from '../data/hauntedData';
import '../styles/spooky.css';
import { useState } from 'react';

const HauntedPage = () => {
  const { id } = useParams();
  const haunted = hauntedPlaces.find((place) => place.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!haunted) {
    return <div className="full-page">Haunted location not found.</div>;
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
    <div className="full-page">
      <h1>{haunted.name}</h1>
      <h3>{haunted.location}</h3>
      <div className="image-carousel">
        <button className="arrow-button" onClick={handlePrevImage}>
          ⬅
        </button>
        <img
          src={haunted.images[currentImageIndex]}
          alt={`${haunted.name} view`}
          className="cryptid-image"
        />
        <button className="arrow-button" onClick={handleNextImage}>
          ➡
        </button>
      </div>
      <p className="cryptid-detail-container">{haunted.description}</p>
    </div>
  );
};

export default HauntedPage;
