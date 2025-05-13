import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CRYPTID_BY_ID } from '../graphql/queries';
import ruckerMansion from '../assets/RuckerMansion.jpg';
import '../styles/spooky.css';

const CryptidDetail = () => {
  const { id } = useParams();

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

      {/* YouTube Sound Button */}
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

      <div className="haunt-highlight">
        <h3 className="flicker">Nearby Haunted Stay: Rucker Mansion</h3>
        <img
          src={ruckerMansion}
          alt="Rucker Mansion"
          className="haunt-image"
        />
        <p>
          Just 30 miles north of Seattle lies the sleepy town of Everett. The city is home to an extravagant — and very haunted — house known as the Rucker Mansion.
        </p>
        <p>
          The Rucker family helped lay the groundwork for Everett in the late 1800s. Their mansion, once home to real estate and lumber magnates, sold for over $3.5 million in 2020.
        </p>
        <p>
          The ghost of Jane Rucker is said to haunt the estate after allegedly committing suicide in 1907. Locals claim she appears at night, playing piano or hovering by her old bedroom window.
        </p>

        <button onClick={() => alert(`Navigating to haunted location near ${cryptid.location}`)}>
          View on Map
        </button>
      </div>
    </div>
  );
};

export default CryptidDetail;
