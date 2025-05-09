import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CRYPTID_BY_ID } from '../graphql/queries';
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
      <p><strong>Location:</strong> {cryptid.location}</p>
      <p><strong>Legend:</strong> {cryptid.description}</p>

      <div className="haunt-highlight">
        <h3>Nearby Haunted Stay:</h3>
        <p><strong>{cryptid.hauntedPlace.name}</strong></p>
        <p>{cryptid.hauntedPlace.description}</p>
        <button onClick={() => {
          alert(`Flying to ${cryptid.location}`);
        }}>
          View on Map
        </button>
      </div>
    </div>
  );
};

export default CryptidDetail;
