import { Link } from 'react-router-dom';
import '../styles/spooky.css';

const cryptids = [
  {
    id: '1',
    name: 'Mothman',
    location: 'Point Pleasant, West Virginia',
    description:
      'A winged humanoid creature with glowing red eyes, often associated with tragedy and eerie warnings. First spotted in 1966.',
    image: '/assets/mothman.jpg',
    soundUrl: 'https://www.youtube.com/watch?v=PHUOoSIlSG0',
    hauntedPlace: {
      name: 'The Lowe Hotel',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Lowe_Hotel.jpg',
      story:
        'The Lowe Hotel is a historic inn located in downtown Point Pleasant, WV. Guests have reported ghostly children playing in the halls and a spirit known as "The Captain" who appears in Room 316.\n\nMany believe these hauntings are connected to the mysterious sightings of Mothman.',
    },
  },
  {
    id: '2',
    name: 'Sasquatch',
    location: 'Everett, Washington',
    description:
      'Also known as Bigfoot, Sasquatch is a large, ape-like creature said to inhabit the forests of the Pacific Northwest.',
    image: '/assets/sasquatch.jpg',
    soundUrl: 'https://www.youtube.com/watch?v=iJHjvjpxm0w',
    hauntedPlace: {
      name: 'Rucker Mansion',
      image: '/assets/RuckerMansion.jpg',
      story:
        'The Rucker Mansion in Everett, WA, is said to be haunted by Jane Rucker, who allegedly committed suicide in 1907. Her ghost is seen playing piano or gazing from windows.',
    },
  },
  {
    id: '3',
    name: 'Skinwalker',
    location: 'Uintah Basin, Utah',
    description:
      'A shape-shifting creature rooted in Navajo legend, the Skinwalker is feared for its supernatural powers and dark presence.',
    image: '/assets/skinwalker.jpg',
    soundUrl: 'https://www.youtube.com/watch?v=YRDZlC-1UVM',
    hauntedPlace: {
      name: 'UFO Valley ATV Campground',
      image: '/assets/ufo-valley.jpg',
      story:
        'Located near Skinwalker Ranch, this campground is surrounded by reports of strange lights, UFOs, and invisible attacks on visitors.',
    },
  },
  {
    id: '4',
    name: 'Headless Men',
    location: 'Cherryvale, Kansas',
    description:
      'Reported throughout Kansas in the late 1800s, these ghostly figures appear without heads and are associated with violent frontier legends.',
    image: '/assets/headless-men.jpg',
    soundUrl: 'https://www.youtube.com/watch?v=kxZ45dhGZ7A',
    hauntedPlace: {
      name: 'Leatherock Hotel',
      image: '/assets/leatherock-hotel.jpg',
      story:
        'The Leatherock Hotel is haunted by disembodied voices, a ghostly woman in white, and even spectral animals. Doors open and slam on their own.',
    },
  },
  {
    id: '5',
    name: 'Chupacabra',
    location: 'Colfax County, New Mexico',
    description:
      'The Chupacabra is said to drain livestock of blood. Its sightings are tied to rural New Mexico and eerie mesas.',
    image: '/assets/chupacabra.jpg',
    soundUrl: 'https://www.youtube.com/watch?v=JwzDChm74HM',
    hauntedPlace: {
      name: 'Casa del Gavilan / Urraca Mesa',
      image: '/assets/casa-del-gavilan.jpg',
      story:
        'Casa del Gavilan sits at the base of Urraca Mesa, believed to be a portal to the underworld. Visitors report strange lights and ghost sightings.',
    },
  },
  {
    id: '6',
    name: 'Curupira',
    location: 'São Paulo, Brazil',
    description:
      'A forest guardian spirit with backward feet, the Curupira protects nature and tricks hunters in the rainforest.',
    image: '/assets/curupira.jpg',
    soundUrl: 'https://www.youtube.com/watch?v=JbbJ1W3U6po',
    hauntedPlace: {
      name: 'The Dream Beach',
      image: '/assets/dream-beach.jpg',
      story:
        'Located in Itanhaém, Brazil, Dream Beach is haunted by two spirits who died on the beach. Apparitions and ghostly voices have been reported.',
    },
  },
  {
    id: '7',
    name: 'Loch Ness Monster',
    location: 'Loch Ness, Scotland',
    description:
      'One of the most famous cryptids in the world, Nessie is said to inhabit the deep waters of Loch Ness.',
    image: '/assets/loch-ness.jpg',
    soundUrl: 'https://www.youtube.com/watch?v=ej0KNuU-KwU',
    hauntedPlace: {
      name: 'Glamis Castle',
      image: '/assets/glamis-castle.jpg',
      story:
        'Scotland’s most haunted castle, Glamis is said to house a tongueless woman, ghostly children, and the Grey Lady.',
    },
  },
  {
    id: '8',
    name: 'Aswang',
    location: 'Baguio, Philippines',
    description:
      'A shapeshifter from Philippine folklore, the Aswang feeds on corpses and unborn children. It appears as a beautiful woman by day.',
    image: '/assets/aswang.jpg',
    soundUrl: 'https://www.youtube.com/watch?v=z8CkW4Xtq7k',
    hauntedPlace: {
      name: 'Diplomat Hotel',
      image: '/assets/diplomat-hotel.jpg',
      story:
        'Once a WWII retreat, the Diplomat Hotel is filled with reports of headless ghosts, screams, and eerie shadows.',
    },
  },
  {
    id: '9',
    name: 'Jersey Devil',
    location: 'Pine Barrens, New Jersey',
    description:
      'Said to be the cursed 13th child of Mother Leeds, the Jersey Devil has wings, hooves, and emits chilling screams.',
    image: '/assets/jersey-devil.jpg',
    soundUrl: 'https://www.youtube.com/watch?v=TVb7ywzIyLc',
    hauntedPlace: {
      name: 'Ghost Lake',
      image: '/assets/ghost-lake.jpg',
      story:
        'Sitting atop an ancient burial ground, Ghost Lake is known for phantom figures that walk across the water.',
    },
  },
  {
    id: '10',
    name: 'Beast of Bray Road',
    location: 'Elkhorn, Wisconsin',
    description:
      'A bipedal wolf-like creature with glowing eyes. It’s been reported stalking roadsides since the 1930s.',
    image: '/assets/bray-road.jpg',
    soundUrl: 'https://www.youtube.com/watch?v=zVLzwG9LQGQ',
    hauntedPlace: {
      name: 'Brumder Mansion',
      image: '/assets/brumder-mansion.jpg',
      story:
        'In Milwaukee, the Brumder Mansion is known for poltergeist activity, moved objects, and terrifying nightmares.',
    },
  },
  {
    id: '11',
    name: 'Dark Watchers',
    location: 'Santa Lucia Mountains, California',
    description:
      'Tall, dark silhouettes that silently watch hikers from ridgelines at dusk. They vanish if approached.',
    image: '/assets/dark-watchers.jpg',
    soundUrl: 'https://www.youtube.com/watch?v=p6Wp9UoTK8A',
    hauntedPlace: {
      name: 'Queen Anne Hotel',
      image: '/assets/queen-anne.jpg',
      story:
        'A former finishing school, the Queen Anne Hotel is haunted by Miss Mary Lake, who reportedly tucks guests into bed.',
    },
  },
];

const CryptidPage = () => {
  return (
    <div className="cryptid-list-container">
      <h1 className="flicker">Explore Cryptids</h1>
      <div className="cryptid-cards">
        {cryptids.map((cryptid) => (
          <div key={cryptid.id} className="cryptid-card">
            <h2>{cryptid.name}</h2>
            <img
              src={cryptid.image || '/placeholder-cryptid.jpg'}
              alt={cryptid.name}
              className="cryptid-thumb"
            />
            <p><strong>Location:</strong> {cryptid.location}</p>
            <Link to={`/cryptids/${cryptid.id}`} className="view-detail-button">
              View {cryptid.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptidPage;
