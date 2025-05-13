import { useRef, useEffect, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';

type Cryptid = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  icon: string;
};

const cryptids: Cryptid[] = [
  {
    id: 'sasquatch',
    name: 'Sasquatch',
    lat: 47.7511,
    lng: -120.7401,
    icon: '/icons/bigfoot.png',
  }
];

const GlobeComponent = () => {
  const globeEl = useRef<GlobeMethods | null>(null);
  const [globeReady, setGlobeReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setGlobeReady(true);
    }, 100);
  }, []);

  useEffect(() => {
    if (globeReady && globeEl.current) {
      globeEl.current.pointOfView({ lat: 47.7511, lng: -120.7401, altitude: 2.5 }, 3000);
    }
  }, [globeReady]);

  return (
    <div style={{ height: '100vh' }}>
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        htmlElementsData={cryptids}
        htmlElement={(d: Cryptid) => {
          const el = document.createElement('div');
          el.innerHTML = `<img src="${d.icon}" alt="${d.name}" width="40" height="40" />`;
          el.style.cursor = 'pointer';
          el.onclick = () => {
            window.location.href = `/cryptid/${d.id}`;
          };
          return el;
        }}
      />
    </div>
  );
};

export default GlobeComponent;
