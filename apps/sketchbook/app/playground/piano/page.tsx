'use client';

import { useRef, useState } from 'react';
import { Slider } from '@workspace/ui/components/slider';
import { Button } from '@workspace/ui/components/button';
import { Duration, getDuration, PIANO_KEYS, SONGS } from '@/lib/piano';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { Volume, VolumeOff } from 'lucide-react';
import PageTitle from '@/components/ui/title';

const Piano = () => {
  const [volume, setVolume] = useState<number[]>([0.5]);
  const [prevVolume, setPrevVolume] = useState<number[]>([0]);
  const [currentFreq, setCurrentFreq] = useState<number>(0);
  const [selectedSong, setSelectedSong] = useState<string>('');
  const vol = volume[0] as number;

  // 오디오 컨텍스트
  const audioContextRef = useRef<AudioContext | null>(
    typeof window !== 'undefined' ? new (window.AudioContext || (window as any).webkitAudioContext)() : null
  );
  const gainNodeRef = useRef<GainNode | null>(audioContextRef.current ? audioContextRef.current.createGain() : null);

  const audioContext = audioContextRef.current;
  const gainNode = gainNodeRef.current;

  const playPianoTone = (freq: number) => {
    if (!audioContext || !gainNode) return;
    if (!volume || volume.length === 0 || vol <= 0) return;

    const osc: OscillatorNode = audioContext.createOscillator();

    // Attack-Decay-Sustain-Release (ADSR) envelope
    const attackTime = 0.01;
    const decayTime = 0.1;
    const sustainLevel = 0.5;
    const releaseTime = 0.5;
    const now = audioContext.currentTime;

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(vol, now + attackTime);
    gainNode.gain.linearRampToValueAtTime(vol * sustainLevel, now + attackTime + decayTime);
    gainNode.gain.setValueAtTime(vol * sustainLevel, now + attackTime + decayTime);
    gainNode.gain.linearRampToValueAtTime(0, now + attackTime + decayTime + releaseTime);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gainNode.connect(audioContext.destination);
    osc.connect(gainNode);

    osc.start();
    osc.stop(now + attackTime + decayTime + releaseTime);

    return osc;
  };

  const onPressNote = async (freq: number, duration?: number) => {
    if (!audioContext) return;
    playPianoTone(freq);
    const time = duration ?? 0.3;

    await audioContext.resume();
    await new Promise(resolve => setTimeout(resolve, time * 1000));
  };

  const onAutoPlaySong = async () => {
    const currentSong = SONGS.find(song => song.id === selectedSong);
    if (!currentSong) return;

    for (const score of currentSong.score) {
      for (const note of score.notes) {
        const key = PIANO_KEYS.find(k => k.pitch === note.pitch && k.octave === note.octave);
        if (!key) continue;

        const freq = key.freq;
        const duration = getDuration(note.duration as Duration);

        setCurrentFreq(freq);
        await onPressNote(freq, duration);
      }
    }

    setCurrentFreq(0);
  };

  const getSongOptions = () => {
    return SONGS.map(song => ({
      label: song.title,
      value: song.id,
    }));
  };

  const onSelectSong = (option: string) => {
    setSelectedSong(option);
  };

  const onChangeVolume = (volumes: number[]) => {
    setVolume(volumes);
  };

  const onClickVolume = () => {
    if (vol > 0) {
      setPrevVolume(volume);
      setVolume([0]);
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
            {vol > 0 ? <Volume /> : <VolumeOff />}
          </button>
          <Slider min={0} max={1} step={0.1} onValueChange={onChangeVolume} value={volume} className="w-[200px]" />
        </div>
        <div className="flex items-center gap-3">
          <Select onValueChange={onSelectSong} value={selectedSong}>
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
            const isCurrent = note.freq === currentFreq;
            const blackClassName = isCurrent && note.pitch.includes('#') ? 'bg-blue-300' : '';
            const whiteClassName = isCurrent && !note.pitch.includes('#') ? 'bg-red-300' : '';

            return (
              <button
                key={`piano-key-${note.pitch}-${index}`}
                className={`relative ${
                  note.pitch.includes('#')
                    ? 'relative w-[20px] h-[60px] z-[2] block my-0 mx-[-7px] bg-black'
                    : 'w-[32px] h-[100px] border-l border-l-gray-400 bg-white'
                } ${blackClassName} ${whiteClassName}`}
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
};

export default Piano;
