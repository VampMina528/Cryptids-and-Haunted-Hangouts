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
    id: '1',
    name: 'Mothman',
    lat: 38.8436,
    lng: -82.1371,
    icon: '/icons/mothman.png',
  },
  {
    id: '2',
    name: 'Sasquatch',
    lat: 47.7511,
    lng: -120.7401,
    icon: '/icons/sasquatch.png',
  },
  {
    id: '3',
    name: 'Skinwalker',
    lat: 40.2600,
    lng: -109.9481,
    icon: '/icons/skinwalker.png',
  },
  {
    id: '4',
    name: 'Headless Men',
    lat: 37.2653,
    lng: -95.6780,
    icon: '/icons/headless.png',
  },
  {
    id: '5',
    name: 'Chupacabra',
    lat: 36.5469,
    lng: -104.8280,
    icon: '/icons/chupacabra.png',
  },
  {
    id: '6',
    name: 'Curupira',
    lat: -24.1732,
    lng: -46.7862,
    icon: '/icons/curupira.png',
  },
  {
    id: '7',
    name: 'Loch Ness Monster',
    lat: 57.3229,
    lng: -4.4244,
    icon: '/icons/nessie.png',
  },
  {
    id: '8',
    name: 'Aswang',
    lat: 16.4023,
    lng: 120.5960,
    icon: '/icons/aswang.png',
  },
  {
    id: '9',
    name: 'Jersey Devil',
    lat: 39.8840,
    lng: -74.7369,
    icon: '/icons/jersey-devil.png',
  },
  {
    id: '10',
    name: 'Beast of Bray Road',
    lat: 42.6728,
    lng: -88.5445,
    icon: '/icons/bray-road.png',
  },
  {
    id: '11',
    name: 'Dark Watchers',
    lat: 35.9577,
    lng: -121.4810,
    icon: '/icons/dark-watchers.png',
  },
];

const GlobeView = () => {
  const globeEl = useRef<GlobeMethods | null>(null);
  const [globeReady, setGlobeReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setGlobeReady(true);
    }, 100);
  }, []);

  useEffect(() => {
    if (globeReady && globeEl.current) {
      globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 3000);
    }
  }, [globeReady]);

  return (
    <div id="globe-canvas">
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
            window.location.href = `/cryptids/${d.id}`;
          };
          return el;
        }}
      />
    </div>
  );
};

export default GlobeView;
