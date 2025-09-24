export type Cell = {
  row: number;
  col: number;
  open: boolean;
  isMine: boolean;
  flagged: boolean;
  adjacentMines: number;
};

export type Board = Cell[][];

