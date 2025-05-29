import { Link } from 'react-router-dom';

type CryptidProps = {
  cryptid: {
    id: string;
    name: string;
    location: string;
    icon: string;
  };
};

const CryptidCard = ({ cryptid }: CryptidProps) => {
  return (
    <div className="cryptid-card">
      <h2 className="flicker">{cryptid.name}</h2>
      <img
        src={cryptid.icon || '/placeholder-cryptid.jpg'}
        alt={cryptid.name || 'Cryptid icon'}
        className="cryptid-thumb"
      />
      <p>
        <strong>Location:</strong> {cryptid.location}
      </p>
      <Link to={`/cryptids/${cryptid.id}`} className="view-detail-button">
        View {cryptid.name}
      </Link>
    </div>
  );
};

export default CryptidCard;
