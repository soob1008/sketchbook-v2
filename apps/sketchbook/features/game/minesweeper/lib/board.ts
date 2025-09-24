import { Board, Level } from '../types';
import { DIRECTION, LEVEL_CONFIG } from './constants';

export const createBoard = (level: Level): Board => {
  const { rows, cols, mines } = LEVEL_CONFIG[level];

  const board: Board = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: cols }, (_, colIndex) => ({
      row: rowIndex,
      col: colIndex,
      open: false,
      isMine: false,
      flagged: false,
      adjacentMines: 0,
    }))
  );

  let placed = 0;
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!board[r]![c]!.isMine) {
      board[r]![c]!.isMine = true;
      placed++;
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r]![c]!.isMine) continue;
      let count = 0;
      for (const [dr, dc] of DIRECTION) {
        const newR = r + dr;
        const newC = c + dc;
        if (newR >= 0 && newC >= 0 && newR < rows && newC < cols && board[newR]![newC]!.isMine) {
          count++;
        }
      }
      board[r]![c]!.adjacentMines = count;
    }
  }

  return board;
};

export const cloneBoard = (board: Board): Board => board.map(row => row.map(c => ({ ...c })));

export const floodOpen = (board: Board, r: number, c: number) => {
  const rows = board.length;
  const cols = board[0]?.length ?? 0;
  const stack: [number, number][] = [[r, c]];

  while (stack.length) {
    const [cr, cc] = stack.pop()!;
    const cell = board[cr]?.[cc];
    if (!cell || cell.open || cell.isMine || cell.flagged) continue;

    cell.open = true;
    if (cell.adjacentMines === 0) {
      for (const [dr, dc] of DIRECTION) {
        const nr = cr + dr;
        const nc = cc + dc;
        if (nr >= 0 && nc >= 0 && nr < rows && nc < cols) {
          stack.push([nr, nc]);
        }
      }
    }
  }
};

export const checkWinOnBoard = (board: Board) => {
  for (const row of board) {
    for (const cell of row) {
      // Win when all non-mine cells are open. Flags do not count as open.
      if (!cell.isMine && !cell.open) {
        return false;
      }
    }
  }
  return true;
};
