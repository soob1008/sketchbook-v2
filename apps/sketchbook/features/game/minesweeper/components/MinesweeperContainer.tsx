'use client';

import { Frown, Laugh, PartyPopper } from 'lucide-react';
import useMinesweeper from '../hooks/useMinesweeper';
import MineCell from './MineCell';
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from '@workspace/ui/components/select';
import { LEVEL_CONFIG, LEVEL_OPTIONS } from '../lib/constants';
import type { Level } from '../types';

export default function MinesweeperContainer() {
  const { board, isGameOver, isWin, flags, restart, openCell, toggleFlag, level, changeLevel } = useMinesweeper();

  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm">난이도 선택 :</span>
        <Select onValueChange={v => changeLevel(v as Level)} value={level}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Music" />
          </SelectTrigger>
          <SelectContent>
            {LEVEL_OPTIONS.map((opt, index) => (
              <SelectItem key={`level-${index}`} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded inline-block">
        <h3 className="font-bold">지뢰찾기 {LEVEL_CONFIG[level].label}</h3>
        <div className="flex items-center justify-center mt-4">
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
                <MineCell
                  key={`cell-${cell.row}-${cell.col}`}
                  cell={cell}
                  onOpen={openCell}
                  onToggleFlag={toggleFlag}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
