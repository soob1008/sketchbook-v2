'use client';

import { useState, useCallback, useEffect } from 'react';
import { Board, Cell, Level } from '../types';
import { createBoard, cloneBoard, floodOpen, checkWinOnBoard } from '../lib/board';
import { LEVEL_CONFIG } from '../lib/constants';

export default function useMinesweeper() {
  const [level, setLevel] = useState<Level>('beginner');
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [board, setBoard] = useState<Board>(() => createBoard(level));
  const [flags, setFlags] = useState(LEVEL_CONFIG[level].mines);

  const restart = useCallback(() => {
    setBoard(createBoard(level));
    setIsGameOver(false);
    setIsWin(false);
    setFlags(LEVEL_CONFIG[level].mines);
  }, [level]);

  useEffect(() => {
    restart();
  }, [restart]);

  const openCell = useCallback(
    (cell: Cell) => {
      if (isGameOver || cell.open) return;
      const newBoard = cloneBoard(board);

      if (cell.isMine) {
        setIsGameOver(true);
        newBoard[cell.row]![cell.col]!.open = true;
      } else {
        floodOpen(newBoard, cell.row, cell.col);
      }

      const won = checkWinOnBoard(newBoard);
      setIsWin(won);
      setBoard(newBoard);
    },
    [board, isGameOver]
  );

  const toggleFlag = useCallback(
    (cell: Cell) => {
      if (isGameOver || cell.open) return;
      const newBoard = cloneBoard(board);
      const target = newBoard[cell.row]![cell.col]!;

      if (target.flagged) {
        target.flagged = false;
        setFlags(prev => prev + 1);
      } else {
        if (flags === 0) return;
        target.flagged = true;
        setFlags(prev => prev - 1);
      }

      const won = checkWinOnBoard(newBoard);
      setIsWin(won);
      setBoard(newBoard);
    },
    [board, flags, isGameOver]
  );

  const changeLevel = useCallback((newLevel: Level) => {
    setLevel(newLevel);
  }, []);

  return {
    board,
    isGameOver,
    isWin,
    level,
    changeLevel,
    flags,
    restart,
    openCell,
    toggleFlag,
  };
}
