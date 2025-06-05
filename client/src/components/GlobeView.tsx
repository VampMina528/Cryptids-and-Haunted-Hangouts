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
      altitude: 0.05 
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
  const match = cryptids.find((c) => c.name === name || c.id === name);
  switch (match?.id) {
    case 'curupira': return -23.5;
    case 'aswang': return 16.4;
    case 'loch-ness-monster': return 57.3;
    case 'jersey-devil': return 39.5;
    case 'el-chupacabra': return 36.5;
    case 'headless-men': return 37.6;
    case 'beast-of-bray-road': return 43.0;
    case 'dark-watchers': return 35.4;
    case 'skinwalker': return 40.2;
    case 'sasquatch': return 47.5;
    case 'mothman': return 38.9;
    default: return 20;
  }
}

function getLongitude(name: string): number {
  const match = cryptids.find((c) => c.name === name || c.id === name);
  switch (match?.id) {
    case 'curupira': return -46.6;
    case 'aswang': return 120.6;
    case 'loch-ness-monster': return -4.5;
    case 'jersey-devil': return -74.7;
    case 'el-chupacabra': return -105.2;
    case 'headless-men': return -95.3;
    case 'beast-of-bray-road': return -88.5;
    case 'dark-watchers': return -121.7;
    case 'skinwalker': return -109.6;
    case 'sasquatch': return -122.3;
    case 'mothman': return -82.1;
    default: return 0;
  }
}


export default GlobeView;
