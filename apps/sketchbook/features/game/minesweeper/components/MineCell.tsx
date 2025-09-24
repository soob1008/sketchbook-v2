"use client";

import { Bomb, Flag } from 'lucide-react';
import { Cell } from '../types';

type Props = {
  cell: Cell;
  onOpen: (cell: Cell) => void;
  onToggleFlag: (cell: Cell) => void;
};

export default function MineCell({ cell, onOpen, onToggleFlag }: Props) {
  const { row, col, open, isMine, adjacentMines, flagged } = cell;
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
        <button
          onClick={() => onOpen(cell)}
          onContextMenu={e => {
            e.preventDefault();
            onToggleFlag(cell);
          }}
          className="flex items-center justify-center w-9 h-9"
        >
          {flagged ? <Flag /> : ''}
        </button>
      )}
    </div>
  );
}
