import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CRYPTID_BY_ID } from '../graphql/queries';
import '../styles/spooky.css';

const CryptidDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, error, data } = useQuery(GET_CRYPTID_BY_ID, {
    variables: { id },
  });

  if (loading) return <p className="flicker">Summoning cryptid...</p>;
  if (error) return <p className="flicker">Cryptid vanished in the mist 🕯</p>;

  const cryptid = data?.getCryptidById;

  return (
    <div className="cryptid-detail-container">
      <h2 className="flicker">{cryptid.name}</h2>
      <img
        src={cryptid.image || '/placeholder-cryptid.jpg'}
        alt={cryptid.name}
        className="cryptid-image"
      />
      {cryptid.soundUrl && (
        <button
          onClick={() => window.open(cryptid.soundUrl, '_blank')}
          className="sound-button"
        >
          🔊 Listen to {cryptid.name}
        </button>
      )}
      <p><strong>Location:</strong> {cryptid.location}</p>
      <p><strong>Legend:</strong> {cryptid.description}</p>
      {cryptid.hauntedPlace && (
        <div className="haunt-highlight">
          <h3 className="flicker">Nearby Haunted Stay: {cryptid.hauntedPlace.name}</h3>
          <img
            src={cryptid.hauntedPlace.image || '/placeholder-haunt.jpg'}
            alt={cryptid.hauntedPlace.name}
            className="haunt-image"
          />
          {cryptid.hauntedPlace.story?.split('\n').map((para: string, i: number) => (
            <p key={i}>{para}</p>
          ))}
          <button onClick={() => alert(`Navigating to haunted location near ${cryptid.location}`)}>
            View on Map
          </button>
        </div>
      )}
    </div>
  );
};

export default CryptidDetail;
