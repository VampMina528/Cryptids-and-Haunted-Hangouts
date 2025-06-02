import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { cryptids } from '../pages/CryptidPage';
import '../styles/spooky.css';

const cryptidToHauntedMap: Record<string, string> = {
  mothman: 'trans-allegheny-asylum',
  sasquatch: 'rucker-mansion',
  skinwalker: 'ufo-valley',
  'headless-men': 'leatherock-hotel',
  'el-chupacabra': 'urraca-mesa',
  curupira: 'dream-beach',
  'loch-ness-monster': 'glamis-castle',
  aswang: 'diplomat-hotel',
  'jersey-devil': 'ghost-lake',
  'beast-of-bray-road': 'brumder-mansion',
  'dark-watchers': 'queen-anne-hotel'
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

const CryptidDetail = () => {
  const { id } = useParams<{ id: string }>();
  const cryptid = cryptids.find((c) => c.id === id);
  const [imageIndex, setImageIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  if (!cryptid) {
    return <p className="flicker full-page">Cryptid not found in this realm</p>;
  }

  const hasMultipleImages = cryptid.images.length > 1;

  const nextImage = () => {
    setImageIndex((prev) => (prev + 1) % cryptid.images.length);
  };

  const prevImage = () => {
    setImageIndex((prev) => (prev - 1 + cryptid.images.length) % cryptid.images.length);
  };

  const getYouTubeID = (url: string): string => {
    const patterns = [
      /youtube\.com\/watch\?v=([\w-]{11})/,
      /youtube\.com\/embed\/([\w-]{11})/,
      /youtu\.be\/([\w-]{11})/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return '';
  };

  return (
    <div className="cryptid-detail-container full-page">
      <h2 className="flicker">{cryptid.name}</h2>

      <div className="image-carousel">
        {hasMultipleImages && (
          <button onClick={prevImage} className="arrow-button">←</button>
        )}
        <img
          src={cryptid.images[imageIndex]}
          alt={`${cryptid.name} ${imageIndex + 1}`}
          className="cryptid-image"
        />
        {hasMultipleImages && (
          <button onClick={nextImage} className="arrow-button">→</button>
        )}
      </div>

      <p><strong>Location:</strong> {cryptid.location}</p>
      <p><strong>Legend:</strong> {cryptid.description}</p>

      {cryptid.videos.length > 0 && (
        <div className="video-links">
          <h3>Related Videos</h3>
          <ul className="video-list">
            {cryptid.videos.map((url: string, i: number) => {
              const title = videoTitles[cryptid.id]?.[i] || `Watch Video ${i + 1}`;
              const youtubeID = getYouTubeID(url);
              return youtubeID ? (
                <li key={i} className="video-entry">
                  <button
                    className="video-title-button"
                    onClick={() => setActiveVideo(activeVideo === i ? null : i)}
                  >
                    {title}
                  </button>
                  {activeVideo === i && (
                    <div className="video-player">
                      <iframe
                        src={`https://www.youtube.com/embed/${youtubeID}`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </li>
              ) : null;
            })}
          </ul>
        </div>
      )}

      <div className="detail-buttons">
        <Link to="/" className="view-detail-button">← Back to Homepage</Link>
        {cryptidToHauntedMap[cryptid.id] && (
          <Link
            to={`/haunted/${cryptidToHauntedMap[cryptid.id]}`}
            className="view-detail-button"
          >
            Haunted Hangout in this Location →
          </Link>
        )}
      </div>
    </div>
  );
};

export default CryptidDetail;
