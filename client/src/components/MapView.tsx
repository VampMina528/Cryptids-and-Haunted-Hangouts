// Interactive cryptid map
import { useEffect, useRef } from 'react';
import Globe from 'globe.gl';

const dummyData = [
  {
    name: 'Mothman',
    lat: 38.9072,
    lng: -82.1013,
    type: 'cryptid'
  },
  {
    name: 'Trans-Allegheny Lunatic Asylum',
    lat: 39.0418,
    lng: -80.4676,
    type: 'haunt'
  }
];

const MapView = () => {
  const globeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const world = Globe()(globeRef.current!)
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .backgroundColor('rgba(0,0,0,0)')
      .pointOfView({ lat: 20, lng: 0, altitude: 2 })
      .htmlElementsData(dummyData)
      .htmlElement(d => {
        const el = document.createElement('div');
        el.innerText = d.name;
        el.style.color = d.type === 'cryptid' ? 'red' : 'cyan';
        el.style.fontFamily = 'Creepster';
        el.style.fontSize = '1rem';
        el.style.cursor = 'pointer';
        el.onclick = () => alert(`${d.name} clicked!`);
        return el;
      });
  }, []);

  return <div ref={globeRef} style={{ width: '100%', height: '100%' }} />;
};

export default MapView;
