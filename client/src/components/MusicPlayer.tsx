import React, { useEffect, useRef, useState } from 'react';
import './MusicPlayer.css';

const originalTracks = [
  '/audio/01 - Overture Of The Rebel Angels - Black Aria - Danzig, Glenn.mp3',
  '/audio/01 - Overture_ Winged Night Demon - Black Aria II - Danzig, Glenn.mp3',
  '/audio/02 - Abbandonment_Recreation - Black Aria II - Danzig, Glenn.mp3',
  '/audio/02 - Conspiracy Dirge - Black Aria - Danzig, Glenn.mp3',
  '/audio/03 - Battle For Heaven - Black Aria - Danzig, Glenn.mp3',
  '/audio/03 - Zemaragad - Black Aria II - Danzig, Glenn.mp3',
  '/audio/04 - Lamia - Black Aria II - Danzig, Glenn.mp3',
  '/audio/04 - Retreat And Descent - Black Aria - Danzig, Glenn.mp3',
  '/audio/05 - Bridal Ceremony of the Lilitu - Black Aria II - Danzig, Glenn.mp3',
  '/audio/05 - Dirge Of Defeat - Black Aria - Danzig, Glenn.mp3',
  '/audio/06 - And The Angels Weep - Black Aria - Danzig, Glenn.mp3',
  '/audio/06 - Dance of the Succubi - Black Aria II - Danzig, Glenn.mp3',
  '/audio/07 - Shifter - Black Aria - Danzig, Glenn.mp3',
  '/audio/07 - Unclean Sephira - Black Aria II - Danzig, Glenn.mp3',
  '/audio/08 - LCKR - Black Aria II - Danzig, Glenn.mp3',
  '/audio/08 - The Morrigu - Black Aria - Danzig, Glenn.mp3',
  '/audio/09 - Cwn Anwnn - Black Aria - Danzig, Glenn.mp3',
  '/audio/09 - The Succubus Feeds - Black Aria II - Danzig, Glenn.mp3',
  '/audio/10 - Shiddin - Black Aria II - Danzig, Glenn.mp3',
  '/audio/11 - Demons Reprise - Black Aria II - Danzig, Glenn.mp3',
  '/audio/12 - Lamenta Lilith - Black Aria II - Danzig, Glenn.mp3'
];

const shuffleArray = (array: string[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const MusicPlayer: React.FC = () => {
  const [shuffledTracks, setShuffledTracks] = useState<string[]>([]);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setShuffledTracks(shuffleArray(originalTracks));
  }, []);

  useEffect(() => {
    if (audioRef.current && shuffledTracks.length > 0) {
      audioRef.current.src = shuffledTracks[currentTrack];
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentTrack, shuffledTracks]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeVolume = (delta: number) => {
    const newVolume = Math.min(1, Math.max(0, volume + delta));
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const switchTrack = (direction: number) => {
    if (shuffledTracks.length === 0) return;
    const nextIndex = (currentTrack + direction + shuffledTracks.length) % shuffledTracks.length;
    setCurrentTrack(nextIndex);
    setIsPlaying(true);
  };

  const handleTrackEnd = () => {
    switchTrack(1);
  };

  return (
    <div className="music-player">
      <button onClick={() => switchTrack(-1)}>⏮</button>
      <button onClick={togglePlay}>{isPlaying ? '⏸' : '▶️'}</button>
      <button onClick={() => switchTrack(1)}>⏭</button>
      <button onClick={() => changeVolume(-0.1)}>🔉</button>
      <button onClick={() => changeVolume(0.1)}>🔊</button>
      <audio
        ref={audioRef}
        onEnded={handleTrackEnd}
        preload="auto"
      />
    </div>
  );
};

export default MusicPlayer;
