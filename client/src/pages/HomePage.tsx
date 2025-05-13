import { useEffect } from 'react';
import GlobeComponent from '../components/Globe'; 
import CodenameForm from '../components/CodenameForm';
import Header from '../components/Header';
import lantern from '../assets/lantern.jpg';
import '../styles/spooky.css';

const HomePage = () => {
  useEffect(() => {
    document.title = "Cryptids & Haunted Hangouts";
  }, []);

  return (
    <div className="homepage-container">
      <Header />

      <main className="main-content">
        <section className="map-section">
          <GlobeComponent /> 
        </section>

        <aside className="side-panel">
          <CodenameForm />
          <div className="info-panel">
            <h2>Select a Location</h2>
            <p>Click on a cryptid or haunted place to explore their eerie details...</p>
          </div>
        </aside>
      </main>

      <div className="lantern-container">
        <img src={lantern} alt="Flickering Lantern" />
      </div>
    </div>
  );
};

export default HomePage;
