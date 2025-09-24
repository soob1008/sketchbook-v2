'use client';

import { useState } from 'react';
import { Frown, Laugh, PartyPopper, Bomb, Flag } from 'lucide-react';

type Cell = {
  row: number;
  col: number;
  open: boolean;
  isMine: boolean;
  flagged: boolean;
  adjacentMines: number;
};

const DIRECTION = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const createBoard = (rows: number, cols: number, mines: number) => {
  // 1. 기본 보드 만들기
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

  // 2. 랜덤 위치에 지뢰 배치
  let placed = 0;
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);

    if (board[r] && board[r][c] && !board[r][c]?.isMine) {
      board[r][c].isMine = true;
      placed++;
    }
  }

  // 3. 주변 지뢰수 업데이트
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].isMine) continue;
      let count = 0;

      for (const [dr, dc] of DIRECTION) {
        const newR = r + dr;
        const newC = c + dc;

        if (newR >= 0 && newC >= 0 && newR < rows && newC < cols && board[newR][newC]?.isMine) {
          count++;
        }
      }

      board[r][c].adjacentMines = count;
    }
  }

  return board;
};

export default function MinesweeperContainer() {
  const [board, setBoard] = useState(createBoard(9, 9, 10));
  const [isGameOver, setIsGameOver] = useState(false);
  const [flag, setFlag] = useState(10);
  // 새 게임 시작
  const handleRestart = () => {
    setBoard(createBoard(9, 9, 10));
  };

  // 깃 발 놓기

  // 셀 열기
  const handleOpenCell = (e, cell: Cell) => {
    if (isGameOver || cell.open) return;

    // if (e.button === 2) {
    // }

    const newBoard = board.map(row => row.map(c => ({ ...c })));

    const openCell = (r: number, c: number) => {
      if (!newBoard[r] || !newBoard[r][c]) return;
      const target = newBoard[r][c];
      if (target.open || target?.isMine) return;

      target.open = true;

      if (target?.adjacentMines === 0) {
        for (const [dr, dc] of DIRECTION) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nc >= 0 && nr < newBoard.length && nc < newBoard[0].length) {
            openCell(nr, nc);
          }
        }
      }
    };

    if (cell.isMine) {
      setIsGameOver(true);
      newBoard[cell.row][cell.col].open = true;
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
        <span>Flag: 10</span>
        <span></span>
      </div>
      {/* 지뢰 찾기 보드 */}
      <div className="flex flex-col mt-4">
        {board.map((row, rowIndex) => {
          return (
            <div key={`row-${rowIndex}`} className="flex items-center">
              {row.map(cell => {
                const { row, col, open, isMine, adjacentMines } = cell;

                const openClass = open
                  ? 'bg-gray-200 shadow-[inset_0.5px_0.5px_0_#666,inset_-0.5px_-0.5px_0_#fff]'
                  : 'bg-gray-300 shadow-[0.5px_0.5px_0_#666,-0.5px_-0.5px_0_#fff]';

                return (
                  <div
                    key={`cell-${row}-${col}`}
                    className={`flex items-center justify-center w-9 h-9 text-sm font-bold 
    border border-gray-400  ${openClass}`}
                  >
                    {open ? (
                      isMine ? (
                        <Bomb />
                      ) : (
                        <span>{adjacentMines}</span>
                      )
                    ) : (
                      <button onClick={e => handleOpenCell(e, cell)} className="w-9 h-9"></button>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
