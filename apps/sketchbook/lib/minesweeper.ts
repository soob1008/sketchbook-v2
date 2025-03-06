export const ROW_LENGTH = 9;
export const COL_LENGTH = 9;
export const MINE_COUNT = 10;

export const AROUND_POSITIONS: Array<[number, number]> = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

export type MineType =
  | 'inVisible'
  | 'visible'
  | 'mine'
  | 'explodedMine'
  | 'flag'
  | 'explodedFlag';

export type GameStatus = 'FAIL' | 'CONTINUE' | 'SUCCESS';