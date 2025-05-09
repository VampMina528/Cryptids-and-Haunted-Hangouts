// Landing page
import { useEffect } from 'react';
import MapView from '../components/MapView';
import CodenameForm from '../components/CodenameForm';
import Header from '../components/Header';
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
          <MapView />
        </section>

        <aside className="side-panel">
          <CodenameForm />
          <div className="info-panel">
            <h2>Select a Location</h2>
            <p>Click on a cryptid or haunted place to explore their eerie details...</p>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default HomePage;
