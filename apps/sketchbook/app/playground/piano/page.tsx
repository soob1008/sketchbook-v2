'use client';

import { useRef, useState, useEffect } from 'react';
import { Slider } from '@workspace/ui/components/slider';
import { Button } from '@workspace/ui/components/button';
import { Duration, getDuration, PIANO_KEYS, SONGS } from '@/lib/piano';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select';
import { Volume, VolumeOff } from 'lucide-react';
import PageTitle from '@/components/ui/title';

export default function Piano() {
  const [volume, setVolume] = useState<number[]>([0.5]);
  const [prevVolume, setPrevVolume] = useState([0]);
  const [currentFreq, setCurrentFreq] = useState(0);
  const [selectedSong, setSelectedSong] = useState('');
  const [isClient, setIsClient] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    setIsClient(true); // 클라이언트에서만 렌더링되도록 설정
    if (typeof window !== 'undefined') {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const gainNode = audioContext.createGain();

      audioContextRef.current = audioContext;
      gainNodeRef.current = gainNode;
    }
  }, []);

  const playPianoTone = (freq: number) => {
    if (!audioContextRef.current || !gainNodeRef.current || volume[0] <= 0)
      return;

    const audioContext = audioContextRef.current;
    const gainNode = gainNodeRef.current;
    const osc: OscillatorNode = audioContext.createOscillator();

    const attackTime = 0.01;
    const decayTime = 0.1;
    const sustainLevel = 0.5;
    const releaseTime = 0.5;
    const now = audioContext.currentTime;

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume[0], now + attackTime);
    gainNode.gain.linearRampToValueAtTime(
      volume[0] * sustainLevel,
      now + attackTime + decayTime
    );
    gainNode.gain.setValueAtTime(
      volume[0] * sustainLevel,
      now + attackTime + decayTime
    );
    gainNode.gain.linearRampToValueAtTime(
      0,
      now + attackTime + decayTime + releaseTime
    );

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioContext.currentTime);

    gainNode.connect(audioContext.destination);
    osc.connect(gainNode);

    osc.start();
    osc.stop(now + attackTime + decayTime + releaseTime);
  };

  if (!isClient) return null;

  return (
    <>
      <PageTitle title="Piano" />
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <button
            style={{ marginRight: 5 }}
            onClick={() => setVolume(volume[0] > 0 ? [0] : prevVolume)}
          >
            {volume[0] > 0 ? <Volume /> : <VolumeOff />}
          </button>
          <Slider
            min={0}
            max={1}
            step={0.1}
            onValueChange={setVolume}
            value={volume}
            className="w-[200px]"
          />
        </div>
      </div>
    </>
  );
}