import React, { useRef, useState } from 'react';
import './MusicPlayer.css';

const tracks = [
  '/audio/cryptid-track-1.mp3',
  '/audio/cryptid-track-2.mp3',
];

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

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
    if (!audioRef.current) return;

    const newVolume = Math.min(1, Math.max(0, audioRef.current.volume + delta));
    audioRef.current.volume = newVolume;
  };

  const switchTrack = (direction: number) => {
    const nextIndex = (currentTrack + direction + tracks.length) % tracks.length;
    setCurrentTrack(nextIndex);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = tracks[nextIndex];
      audioRef.current.play();
    }
  };

  return (
    <div className="music-player">
      <button onClick={() => switchTrack(-1)}>⏮</button>
      <button onClick={togglePlay}>{isPlaying ? '⏸' : '▶️'}</button>
      <button onClick={() => switchTrack(1)}>⏭</button>
      <button onClick={() => changeVolume(-0.1)}>🔉</button>
      <button onClick={() => changeVolume(0.1)}>🔊</button>
      <audio ref={audioRef} src={tracks[currentTrack]} loop />
    </div>
  );
};

export default MusicPlayer;
