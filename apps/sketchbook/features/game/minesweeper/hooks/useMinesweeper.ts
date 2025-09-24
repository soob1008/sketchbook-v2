"use client";

import { useState, useCallback } from 'react';
import { Board, Cell } from '../types';
import { createBoard, cloneBoard, floodOpen, checkWinOnBoard } from '../lib/board';
import { DEFAULT_COLS, DEFAULT_MINES, DEFAULT_ROWS } from '../lib/constants';

export default function useMinesweeper(rows = DEFAULT_ROWS, cols = DEFAULT_COLS, mines = DEFAULT_MINES) {
  const [board, setBoard] = useState<Board>(() => createBoard(rows, cols, mines));
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [flags, setFlags] = useState(mines);

  const restart = useCallback(() => {
    setBoard(createBoard(rows, cols, mines));
    setIsGameOver(false);
    setIsWin(false);
    setFlags(mines);
  }, [rows, cols, mines]);

  const openCell = useCallback((cell: Cell) => {
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
  }, [board, isGameOver]);

  const toggleFlag = useCallback((cell: Cell) => {
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
  }, [board, flags, isGameOver]);

  return {
    board,
    isGameOver,
    isWin,
    flags,
    restart,
    openCell,
    toggleFlag,
  };
}
