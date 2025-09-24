'use client';

import { Frown, Laugh, PartyPopper } from 'lucide-react';
import useMinesweeper from '../hooks/useMinesweeper';
import MineCell from './MineCell';

export default function MinesweeperContainer() {
  const { board, isGameOver, isWin, flags, restart, openCell, toggleFlag } = useMinesweeper();

  return (
    <div className="p-4 bg-gray-100 w-[360px] rounded">
      <h3 className="font-bold">지뢰찾기 초급</h3>
      <div className="flex items-center justify-center mt-6">
        <button type="button" onClick={restart} className="p-1 bg-white rounded">
          {isWin && <PartyPopper />}
          {isGameOver && !isWin && <Frown />}
          {!isGameOver && !isWin && <Laugh />}
        </button>
      </div>
      <div className="flex">
        <span>Flag: {flags}</span>
      </div>
      <div className="flex flex-col mt-4">
        {board.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex items-center">
            {row.map(cell => (
              <MineCell key={`cell-${cell.row}-${cell.col}`} cell={cell} onOpen={openCell} onToggleFlag={toggleFlag} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
