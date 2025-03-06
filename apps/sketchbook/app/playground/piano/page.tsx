'use client';

import { useRef, useState } from 'react';
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

  const audioContext = useRef(
    new (AudioContext ?? (window as any).webkitAudioContext)()
  ).current;

  const gainNode = useRef(audioContext.createGain()).current;

  const playPianoTone = (freq: number) => {
    if (volume[0] <= 0) return;
    const osc: OscillatorNode = audioContext.createOscillator();

    // Attack-Decay-Sustain-Release (ADSR) envelope 적용
    const attackTime = 0.01; // Attack 시간 (초)
    const decayTime = 0.1; // Decay 시간 (초)
    const sustainLevel = 0.5; // Sustain 레벨 (0에서 1 사이)
    const releaseTime = 0.5; // Release 시간 (초)
    const now = audioContext.currentTime;

    // Attack
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume[0], now + attackTime);

    // Decay
    gainNode.gain.linearRampToValueAtTime(
      volume[0] * sustainLevel,
      now + attackTime + decayTime
    );

    // Sustain (유지)
    gainNode.gain.setValueAtTime(
      volume[0] * sustainLevel,
      now + attackTime + decayTime
    );

    // Release
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

    return osc;
  };

  const onPressNote = async (freq: number, duration?: number) => {
    playPianoTone(freq);
    const time = duration ? duration : 0.3;

    await audioContext.resume();
    await new Promise((resolve) => setTimeout(resolve, time * 1000));
  };

  const onAutoPlaySong = async () => {
    const currentSong = SONGS.filter((song) => song.id === selectedSong)[0];

    const songs = currentSong.score.map((notes) => notes.notes);

    for (let song of songs) {
      for (let note of song) {
        const { freq } = PIANO_KEYS.find(
          (key) => key.pitch === note.pitch && key.octave === note.octave
        ) || { freq: 0 };

        const duration = getDuration(note.duration as Duration);

        setCurrentFreq(freq);
        await onPressNote(freq, duration);
      }
    }

    setCurrentFreq(0);
  };

  const getSongOptions = () => {
    return SONGS.map((song) => {
      return { label: song.title, value: song.id };
    });
  };

  const onSelectSong = (option: string) => {
    setSelectedSong(String(option));
  };

  const onChangeVolume = (volumes: number[]) => {
    setVolume(volumes);
  };

  const onClickVolume = () => {
    if (volume[0] > 0) {
      setVolume([0]);
      setPrevVolume(volume);
    } else {
      setVolume(prevVolume);
    }
  };

  return (
    <>
      <PageTitle title="Piano" />
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <button style={{ marginRight: 5 }} onClick={onClickVolume}>
            {volume[0] > 0 ? <Volume /> : <VolumeOff />}
          </button>
          <Slider
            min={0}
            max={1}
            step={0.1}
            onValueChange={onChangeVolume}
            value={volume}
            className="w-[200px]"
          />
        </div>
        <div className="flex items-center gap-3">
          <Select onValueChange={onSelectSong}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Music" />
            </SelectTrigger>
            <SelectContent>
              {getSongOptions().map((opt, index) => (
                <SelectItem key={`song-${index}`} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={onAutoPlaySong}>Music Start</Button>
        </div>
      </div>
      <div className="w-[1024px]">
        <div className="overflow-hidden flex mt-20 p-3 bg-black rounded-sm">
          {PIANO_KEYS.map((note, index) => {
            const blackClassName =
              note.freq === currentFreq && note.pitch.includes('#')
                ? 'bg-blue-300'
                : '';
            const whiteClassName =
              note.freq === currentFreq && !note.pitch.includes('#')
                ? 'bg-red-300'
                : '';

            return (
              <button
                key={`piano-key-${note.pitch}-${index}`}
                className={`relative ${note.pitch.includes('#') ? 'relative w-[20px] h-[60px] z-[2] block my-0 mx-[-7px] bg-black' : 'w-[32px] h-[100px] border-l border-l-gray-400 bg-white'} ${blackClassName} ${whiteClassName}`}
                onClick={() => onPressNote(note.freq)}
              >
                {!note.pitch.includes('#') && (
                  <span className="absolute left-1/2 bottom-[3px] -translate-x-1/2 text-[10px]">
                    {note.pitch}
                    {note.octave}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}