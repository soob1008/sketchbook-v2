import { Level } from '../types';

// Neighbor directions (8-way)
export const DIRECTION: [number, number][] = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export const LEVEL_OPTIONS: { label: string; value: Level }[] = [
  { label: '초급', value: 'beginner' },
  { label: '중급', value: 'intermediate' },
  { label: '고급', value: 'expert' },
];

export const LEVEL_CONFIG: Record<Level, { rows: number; cols: number; mines: number; label: string; width?: number }> =
  {
    beginner: { rows: 9, cols: 9, mines: 10, label: '초급', width: 360 },
    intermediate: { rows: 16, cols: 16, mines: 40, label: '중급', width: 600 },
    expert: { rows: 16, cols: 30, mines: 99, label: '고급' },
  };
