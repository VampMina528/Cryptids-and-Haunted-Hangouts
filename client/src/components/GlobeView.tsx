import { useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import createGlobe from 'globe.gl';
import { cryptids } from '../pages/CryptidPage';
import { CryptidContext } from '../App';

const GlobeView = () => {
  const globeRef = useRef<HTMLDivElement>(null);
  const globeInstance = useRef<any>(null);
  const navigate = useNavigate();
  const context = useContext(CryptidContext);

  useEffect(() => {
    if (!globeRef.current) return;

    const instance = new createGlobe(globeRef.current)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .pointOfView({ lat: 20, lng: 0, altitude: 2 }, 0)
      .htmlElementsData(
        cryptids.map((c) => ({
          ...c,
          lat: getLatitude(c.name),
          lng: getLongitude(c.name),
        }))
      )
      .htmlElement((d: any) => {
        const cryptid = d as typeof cryptids[number];
        const el = document.createElement('div');
        el.innerHTML = `
          <div style="text-align: center;">
            <img 
              src="${cryptid.icon}" 
              alt="${cryptid.name}" 
              title="${cryptid.name}" 
              width="28" 
              height="28" 
              class="globe-icon" 
            />
            <div class="globe-label">${cryptid.name}</div>
          </div>
        `;
        el.style.cursor = 'pointer';
        el.style.zIndex = '10';
        el.style.pointerEvents = 'auto';
        el.style.position = 'absolute';

        el.onclick = () => {
          if (context) context.selectCryptid(cryptid.id);
          navigate(`/cryptids/${cryptid.id}`);
        };

        return el;
      });

    globeInstance.current = instance;

    const controls = instance.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    controls.enableZoom = true;
    controls.enableRotate = true;
    controls.enablePan = false;
    controls.update();

    const handleResize = () => {
      if (globeRef.current) {
        instance.width(globeRef.current.clientWidth);
        instance.height(globeRef.current.clientHeight);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (globeRef.current) globeRef.current.innerHTML = '';
      globeInstance.current = null;
    };
  }, [navigate, context]);

  return <div ref={globeRef} className="globe-container" />;
};

function getLatitude(name: string): number {
  const match = cryptids.find((c) => c.name === name);
  return match?.location.includes('Brazil') ? -23.5 :
    match?.location.includes('Philippines') ? 16.4 :
      match?.location.includes('Scotland') ? 57.3 :
        match?.location.includes('New Jersey') ? 39.5 :
          match?.location.includes('New Mexico') ? 36.5 :
            match?.location.includes('Kansas') ? 37.6 :
              match?.location.includes('Wisconsin') ? 43.0 :
                match?.location.includes('California') ? 35.4 :
                  match?.location.includes('Utah') ? 40.2 :
                    match?.location.includes('Washington') ? 47.5 :
                      match?.location.includes('West Virginia') ? 38.9 : 20;
}

function getLongitude(name: string): number {
  const match = cryptids.find((c) => c.name === name);
  return match?.location.includes('Brazil') ? -46.6 :
    match?.location.includes('Philippines') ? 120.6 :
      match?.location.includes('Scotland') ? -4.5 :
        match?.location.includes('New Jersey') ? -74.7 :
          match?.location.includes('New Mexico') ? -105.2 :
            match?.location.includes('Kansas') ? -95.3 :
              match?.location.includes('Wisconsin') ? -88.5 :
                match?.location.includes('California') ? -121.7 :
                  match?.location.includes('Utah') ? -109.6 :
                    match?.location.includes('Washington') ? -122.3 :
                      match?.location.includes('West Virginia') ? -82.1 : 0;
}

export default GlobeView;
