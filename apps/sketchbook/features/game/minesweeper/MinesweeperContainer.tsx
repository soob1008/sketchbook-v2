'use client';

import { useState } from 'react';
import { Laugh, Bomb } from 'lucide-react';

type Cell = {
  row: number;
  col: number;
  open: boolean;
  isMine: boolean;
  flagged: boolean;
  adjacentMines: number;
};

const DIRECTION: [number, number][] = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const createBoard = (rows: number, cols: number, mines: number): Cell[][] => {
  const board: Cell[][] = Array.from({ length: rows }, (_, rowIndex) =>
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

export default function MinesweeperContainer() {
  const [board, setBoard] = useState<Cell[][]>(() => createBoard(9, 9, 10));
  const [isGameOver, setIsGameOver] = useState(false);
  const [flag, setFlag] = useState(10);

  const handleRestart = () => {
    setBoard(createBoard(9, 9, 10));
    setIsGameOver(false);
    setFlag(10);
  };

  const handleOpenCell = (e: React.MouseEvent<HTMLButtonElement>, cell: Cell) => {
    if (isGameOver || cell.open) return;

    const newBoard: Cell[][] = board.map(row => row.map(c => ({ ...c })));

    const openCell = (r: number, c: number) => {
      if (!newBoard[r] || !newBoard[r][c]) return;
      const target = newBoard[r][c];
      if (target.open || target.isMine) return;

      target.open = true;

      if (target.adjacentMines === 0) {
        for (const [dr, dc] of DIRECTION) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nc >= 0 && nr < newBoard.length && nc < newBoard[0]!.length) {
            openCell(nr, nc);
          }
        }
      }
    };

    if (cell.isMine) {
      setIsGameOver(true);
      newBoard[cell.row]![cell.col]!.open = true;
    } else {
      openCell(cell.row, cell.col);
    }

    setBoard(newBoard);
  };

  return (
    <div className="p-4 bg-gray-100 w-[360px] rounded">
      <h3 className="font-bold">지뢰찾기 초급</h3>
      <div className="flex items-center justify-center mt-6">
        <button type="button" onClick={handleRestart} className="p-1 bg-white rounded">
          <Laugh />
        </button>
      </div>
      <div className="flex">
        <span>Flag: {flag}</span>
      </div>
      <div className="flex flex-col mt-4">
        {board.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex items-center">
            {row.map(cell => {
              const { row, col, open, isMine, adjacentMines } = cell;

              const openClass = open
                ? 'bg-gray-200 shadow-[inset_0.5px_0.5px_0_#666,inset_-0.5px_-0.5px_0_#fff]'
                : 'bg-gray-300 shadow-[0.5px_0.5px_0_#666,-0.5px_-0.5px_0_#fff]';

              return (
                <div
                  key={`cell-${row}-${col}`}
                  className={`flex items-center justify-center w-9 h-9 text-sm font-bold border border-gray-400 ${openClass}`}
                >
                  {open ? (
                    isMine ? (
                      <Bomb />
                    ) : (
                      <span>{adjacentMines}</span>
                    )
                  ) : (
                    <button onClick={e => handleOpenCell(e, cell)} className="w-9 h-9" />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
