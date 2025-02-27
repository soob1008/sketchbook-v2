export type Pitch =
  | 'c'
  | 'c#'
  | 'd'
  | 'd#'
  | 'e'
  | 'f'
  | 'f#'
  | 'g'
  | 'g#'
  | 'a'
  | 'a#'
  | 'b';

export type Duration = 'eight' | 'quarter' | 'half' | 'whole';

export interface PianoKey {
  pitch: Pitch;
  octave: number;
  freq: number;
}

// 주파수(Hz) = 2^(octave - 1) * 55 * 2^((noteIndex-10) / 12)
const NOTES = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];

export const createNote = () => {
  let pianoKeys: PianoKey[] = [];

  for (let octave = 0; octave < 9; octave++) {
    for (let i in NOTES) {
      const noteIndex = Number(i);

      if ((octave === 0 && noteIndex < 9) || (octave === 8 && noteIndex > 0))
        continue;

      pianoKeys.push({
        pitch: NOTES[i] as Pitch,
        octave,
        freq: Math.pow(2, octave - 1) * 55 * Math.pow(2, (noteIndex - 10) / 12),
      });
    }
  }

  return pianoKeys;
};

export const PIANO_KEYS = createNote();

export const getDuration = (type: Duration) => {
  switch (type) {
    case 'eight':
      return 0.3;
    case 'quarter':
      return 0.5;
    case 'half':
      return 0.8;
    case 'whole':
      return 1;
  }
};

/*
 * 악보 샘플 작성
 * 도: c 레: d 미: e 파: f 솔: g 라: a 시: b
 * */
export const SONGS = [
  {
    id: 'happyBirthday',
    title: '생일 축하합니다',
    keySignature: 'C Major',
    timeSignature: '4/3',
    score: [
      {
        measure: 1,
        notes: [
          {
            pitch: 'g',
            octave: 4,
            duration: 'eight',
          },
          {
            pitch: 'g',
            octave: 4,
            duration: 'eight',
          },
        ],
      },
      {
        measure: 2,
        notes: [
          {
            pitch: 'a',
            octave: 4,
            duration: 'quarter',
          },
          {
            pitch: 'g',
            octave: 4,
            duration: 'quarter',
          },
          {
            pitch: 'c',
            octave: 5,
            duration: 'quarter',
          },
        ],
      },
      {
        measure: 3,
        notes: [
          {
            pitch: 'b',
            octave: 4,
            duration: 'half',
          },
          {
            pitch: 'g',
            octave: 4,
            duration: 'eight',
          },
          {
            pitch: 'g',
            octave: 4,
            duration: 'eight',
          },
        ],
      },
      {
        measure: 4,
        notes: [
          {
            pitch: 'a',
            octave: 4,
            duration: 'quarter',
          },
          {
            pitch: 'g',
            octave: 4,
            duration: 'quarter',
          },
          {
            pitch: 'd',
            octave: 5,
            duration: 'quarter',
          },
        ],
      },
      {
        measure: 5,
        notes: [
          {
            pitch: 'c',
            octave: 5,
            duration: 'half',
          },
          {
            pitch: 'g',
            octave: 4,
            duration: 'eight',
          },
          {
            pitch: 'g',
            octave: 4,
            duration: 'eight',
          },
        ],
      },
      {
        measure: 6,
        notes: [
          {
            pitch: 'g',
            octave: 5,
            duration: 'quarter',
          },
          {
            pitch: 'e',
            octave: 5,
            duration: 'quarter',
          },
          {
            pitch: 'c',
            octave: 5,
            duration: 'quarter',
          },
        ],
      },
      {
        measure: 7,
        notes: [
          {
            pitch: 'b',
            octave: 4,
            duration: 'quarter',
          },
          {
            pitch: 'a',
            octave: 4,
            duration: 'quarter',
          },
          {
            pitch: 'f',
            octave: 5,
            duration: 'eight',
          },
          {
            pitch: 'f',
            octave: 5,
            duration: 'eight',
          },
        ],
      },
      {
        measure: 8,
        notes: [
          {
            pitch: 'e',
            octave: 5,
            duration: 'quarter',
          },
          {
            pitch: 'c',
            octave: 5,
            duration: 'quarter',
          },
          {
            pitch: 'd',
            octave: 5,
            duration: 'quarter',
          },
        ],
      },
      {
        measure: 9,
        notes: [
          {
            pitch: 'c',
            octave: 5,
            duration: 'half',
          },
        ],
      },
    ],
  },
  {
    id: 'watch',
    title: '할아버지의 낡은 시계',
    keySignature: 'C Major',
    timeSignature: '4/4',
    score: [
      {
        measure: 1,
        notes: [
          { pitch: 'g', octave: 4, duration: 'half' },
          { pitch: 'g', octave: 4, duration: 'half' },
        ],
      },
      {
        measure: 2,
        notes: [
          { pitch: 'c', octave: 5, duration: 'half' },
          { pitch: 'b', octave: 4, duration: 'quarter' },
          { pitch: 'c', octave: 5, duration: 'quarter' },
        ],
      },
      {
        measure: 3,
        notes: [
          { pitch: 'd', octave: 5, duration: 'half' },
          { pitch: 'c', octave: 5, duration: 'quarter' },
          { pitch: 'd', octave: 5, duration: 'quarter' },
        ],
      },
      {
        measure: 4,
        notes: [
          { pitch: 'e', octave: 5, duration: 'quarter' },
          { pitch: 'e', octave: 5, duration: 'quarter' },
          { pitch: 'f', octave: 5, duration: 'quarter' },
          { pitch: 'e', octave: 5, duration: 'quarter' },
        ],
      },
      {
        measure: 5,
        notes: [
          { pitch: 'a', octave: 4, duration: 'half' },
          { pitch: 'd', octave: 5, duration: 'quarter' },
          { pitch: 'd', octave: 5, duration: 'quarter' },
        ],
      },
      {
        measure: 6,
        notes: [
          { pitch: 'c', octave: 5, duration: 'half' },
          { pitch: 'c', octave: 5, duration: 'quarter' },
          { pitch: 'c', octave: 5, duration: 'quarter' },
        ],
      },
      {
        measure: 7,
        notes: [
          { pitch: 'b', octave: 4, duration: 'half' },
          { pitch: 'a', octave: 4, duration: 'quarter' },
          { pitch: 'b', octave: 4, duration: 'quarter' },
        ],
      },
      {
        measure: 8,
        notes: [
          {
            pitch: 'c',
            octave: 5,
            duration: 'whole',
          },
        ],
      },
    ],
  },
];