import { useParams, Link } from 'react-router-dom';
import { cryptids } from '../pages/CryptidPage';
import { useState } from 'react';
import '../styles/spooky.css';

const CryptidDetail = () => {
  const { id } = useParams<{ id: string }>();
  const cryptid = cryptids.find((c) => c.id === id);
  const [imageIndex, setImageIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  if (!cryptid) return <p className="flicker">Cryptid not found in this realm 🕯</p>;

  const hasMultipleImages = cryptid.images.length > 1;

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % cryptid.images.length);
  };

  const prevImage = () => {
    setImageIndex((prev) => (prev - 1 + cryptid.images.length) % cryptid.images.length);
  };

  const getYouTubeID = (url: string): string => {
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&?]+)/);
    return match ? match[1] : '';
  };

  const videoTitles: Record<string, string[]> = {
    mothman: [
      'The Mothman of Point Pleasant',
      'Inside the Mothman Museum | Point Pleasant, WV'
    ],
    sasquatch: [
      'Bigfoot is Real…12 Undeniable Sightings They Want to Keep Quiet',
      'The UnXplained: Eyewitness Accounts of Bigfoot (S2, E13) | Full Episode'
    ],
    skinwalker: [
      'Beyond Skinwalker Ranch: Navajo Nation is CRAWLING with Skinwalkers (Season 1)',
      '6 Terrifying SKINWALKER Videos Caught on Camera'
    ],
    'headless-men': [
      'The Valley of the Headless Men',
      'The Headless Men: 5 Unexplained Ancient Creatures'
    ],
    'el-chupacabra': [
      'What Is This Blood Thirsty Monster?',
      'TERRIFYING El Chupacabra Found *Video Included* | The Proof Is Out There'
    ],
    curupira: [
      'Curupira – The Guardian of the Brazilian Forests – Brazilian Folklore',
      'MF #37: The Curupira [Brazilian Mythology]'
    ],
    'loch-ness-monster': [
      'A Brief History of the Loch Ness Monster',
      'Truth Behind the Loch Ness Monster (S2, E1) | In Search of | Full Episode'
    ],
    aswang: [
      "Aswang: Philippines' Scariest Mythical Creatures",
      'MF #20: The Aswang [Philippine Mythology]'
    ],
    'jersey-devil': [
      'The True Story of the Jersey Devil',
      'A Sinister Presence: The Jersey Devil’s Chilling Legacy | In Search Of Monsters | Travel Channel'
    ],
    'beast-of-bray-road': [
      'Beast of Bray Road | Monsters and Mysteries in America',
      'The Beast of Bray Road'
    ],
    'dark-watchers': [
      'Dark Watchers: Sinister History of These Coastal Californian Entities',
      'The Mystery of California’s Dark Watchers'
    ]
  };

  return (
    <div className="cryptid-detail-container full-page">
      <h2 className="flicker">{cryptid.name}</h2>

      <div className="image-carousel">
        {hasMultipleImages && (
          <button onClick={prevImage} className="arrow-button">&#8592;</button>
        )}
        <img
          src={cryptid.images[imageIndex]}
          alt={`${cryptid.name} ${imageIndex + 1}`}
          className="cryptid-image"
        />
        {hasMultipleImages && (
          <button onClick={nextImage} className="arrow-button">&#8594;</button>
        )}
      </div>

      <p><strong>Location:</strong> {cryptid.location}</p>
      <p><strong>Legend:</strong> {cryptid.description}</p>

      {cryptid.videos.length > 0 && (
        <div className="video-links">
          <h3>Related Videos</h3>
          <ul className="video-list">
            {cryptid.videos.map((url, i) => {
              const title = videoTitles[cryptid.id]?.[i] || `Watch Video ${i + 1}`;
              const youtubeID = getYouTubeID(url);

              return (
                <li key={i} className="video-entry">
                  <button className="video-title-button" onClick={() => setActiveVideo(i === activeVideo ? null : i)}>
                    {title}
                  </button>
                  {activeVideo === i && youtubeID && (
                    <div className="video-player">
                      <iframe
                        src={`https://www.youtube.com/embed/${youtubeID}`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                  {activeVideo === i && !youtubeID && (
                    <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="detail-buttons">
        <Link to="/" className="view-detail-button">&#8592; Back to Homepage</Link>
        <button className="view-detail-button" onClick={() => alert(`Show haunted location near ${cryptid.location}`)}>
          Haunted Hangout in this location &#8594;
        </button>
      </div>
    </div>
  );
};

export default CryptidDetail;
