'use client';

import { useState } from 'react';
import { Frown, Laugh, PartyPopper, Bomb, Flag } from 'lucide-react';

type Cell = {
  row: number;
  col: number;
  open: boolean;
  isMine: boolean;
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

  // 새 게임 시작
  const handleRestart = () => {
    setBoard(createBoard(9, 9, 10));
  };

  // 셀 열기
  const handleOpenCell = (cell: Cell) => {
    console.log('open', cell);
  };
  return (
    <div className="p-4 bg-red-100 w-[360px] rounded">
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
      <div className="flex flex-col gap-2 mt-4">
        {board.map((row, rowIndex) => {
          return (
            <div key={`row-${rowIndex}`} className="flex items-center justify-around">
              {row.map(cell => {
                const { row, col, open, isMine, adjacentMines } = cell;

                return (
                  <div
                    key={`cell-${row}-${col}`}
                    className="flex items-center justify-center w-8 h-8 bg-gray-300 rounded-sm text-sm"
                  >
                    {open ? (
                      isMine ? (
                        <Bomb />
                      ) : (
                        <span>{adjacentMines}</span>
                      )
                    ) : (
                      <button onClick={() => handleOpenCell(cell)}>{cell.adjacentMines}</button>
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
