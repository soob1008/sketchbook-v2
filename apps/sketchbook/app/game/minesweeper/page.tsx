'use client';

import { useState, MouseEvent } from 'react';
import { Frown, Laugh, PartyPopper, Bomb, Flag } from 'lucide-react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {
  AROUND_POSITIONS,
  COL_LENGTH,
  GameStatus,
  MINE_COUNT,
  MineType,
  ROW_LENGTH,
} from '@/lib/minesweeper';
import useInterval from '@/hooks/useInterval';
import PageTitle from '@/components/ui/title';

dayjs.extend(duration);

interface MineBlock {
  type: MineType;
  isMine: boolean;
  isOpen: boolean;
  mineCount: number;
}

// 지뢰 좌표 생성함수
const getMinePosition = () => {
  // 랜덤으로 10개 좌표 생성해서
  const mineArr: number[][] = [];

  while (mineArr.length < MINE_COUNT) {
    const x = Math.floor(Math.random() * COL_LENGTH);
    const y = Math.floor(Math.random() * ROW_LENGTH);

    const included = mineArr.some(
      (minePos) => JSON.stringify(minePos) === JSON.stringify([x, y])
    );

    if (!included) {
      mineArr.push([x, y]);
    }
  }

  return mineArr;
};

// 지뢰 좌표를 보드 값에 넣어주고
const createMineBoard = (): MineBlock[][] => {
  const initBoardArray: MineBlock[][] = Array.from(
    { length: ROW_LENGTH },
    (_: MineBlock[], rowIndex) =>
      Array(COL_LENGTH)
        .fill({} as MineBlock)
        .map((_: MineBlock, colIndex) => ({
          type: 'inVisible',
          isOpen: false,
          isMine: false,
          mineCount: 0,
        }))
  );

  const minePosition: number[][] = getMinePosition();

  // 보드에 isMine true 넣어주기
  initBoardArray.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (!initBoardArray[rowIndex] || !initBoardArray[rowIndex][cellIndex])
        return;

      for (let pos of minePosition) {
        const { [0]: x, [1]: y } = pos;

        if (x === cellIndex && y === rowIndex) {
          initBoardArray[rowIndex][cellIndex] = {
            ...initBoardArray[rowIndex][cellIndex],
            isMine: true,
          };
        }
      }
    });
  });

  return initBoardArray;
};

const MineSweeperBoard = () => {
  const [board, setBoard] = useState<MineBlock[][]>(() => createMineBoard());
  const [remainFlag, setRemainFlag] = useState(MINE_COUNT);
  const [gameStatus, setGameStatus] = useState<GameStatus>('CONTINUE');
  const [time, setTime] = useState(0);

  const setMineBlockToBoard = (
    newBoard: MineBlock[][],
    x: number,
    y: number,
    block: MineBlock
  ) => {
    if (!newBoard[y] || !newBoard[y][x]) return;
    newBoard[y][x] = block;
  };

  const checkGameOver = (board: MineBlock[][]) => {
    let closeCount = 0;
    for (let row of board) {
      for (let cell of row) {
        if (cell.isMine && cell.isOpen) {
          return 'FAIL';
        }

        if (!cell.isMine && !cell.isOpen) {
          closeCount += 1;
        }
      }
    }

    if (closeCount > 0) {
      return 'CONTINUE';
    }

    return 'SUCCESS';
  };

  useInterval(
    () => {
      setTime(time + 1);
    },
    gameStatus === 'FAIL' || gameStatus === 'SUCCESS' ? null : 1000
  );

  const onClickBlock = (event: MouseEvent, x: number, y: number) => {
    event.preventDefault();
    if (gameStatus === 'FAIL') return;
    if (!board[y] || !board[y][x]) return;
    if (board[y][x].isOpen) return;
    const newBoard = board.map((row) => [...row]);

    // 왼쪽 마우스 눌렀을 때
    if (!newBoard[y] || !newBoard[y][x]) return;
    if (event.button === 0) {
      // 누른 곳이 지뢰면, -> isMine 1, mineCount 0, isOpen 1 - explodedMine
      if (newBoard[y][x].isMine) {
        setMineBlockToBoard(newBoard, x, y, {
          ...newBoard[y][x],
          isOpen: true,
          type: 'explodedMine',
        });
      } else {
        // 누른 곳이 지뢰가 아니면, 주변에 지뢰가 있는지 검사한다. 지뢰가 없으면 오픈 -  openBlock();
        openBlock(newBoard, x, y);
      }
    } else if (event.button === 2) {
      if (remainFlag > 0 && newBoard[y][x].type === 'inVisible') {
        setMineBlockToBoard(newBoard, x, y, {
          ...newBoard[y][x],
          type: 'flag',
        });

        setRemainFlag((prev) => prev - 1);
      } else if (newBoard[y][x].type === 'flag') {
        setMineBlockToBoard(newBoard, x, y, {
          ...newBoard[y][x],
          type: 'inVisible',
        });

        setRemainFlag((prev) => prev + 1);
      }
    }

    // 게임 성공, 실패, 게임중 처리
    const status = checkGameOver(newBoard);
    setGameStatus(status);

    setBoard(newBoard);
  };

  const onClickStart = () => {
    setBoard(createMineBoard());
    setRemainFlag(MINE_COUNT);
    setGameStatus('CONTINUE');
    setTime(0);
  };

  const getMineCount = (board: MineBlock[][], x: number, y: number) => {
    let count = 0;

    for (let pos of AROUND_POSITIONS) {
      const [posX, posY] = pos;

      const newX = x + posX;
      const newY = y + posY;

      if (newY >= 0 && newY < ROW_LENGTH && newX >= 0 && newX < COL_LENGTH) {
        if (board[newY]?.[newX]?.isMine) count++;
      }
    }

    return count;
  };

  const openBlock = (board: MineBlock[][], x: number, y: number) => {
    // x, y 값이 0 보다 작거나 maxLength 보다 크면 종료.
    if (
      x < 0 ||
      y < 0 ||
      x >= COL_LENGTH ||
      y >= ROW_LENGTH ||
      board[y]?.[x]?.isOpen ||
      board[y]?.[x]?.type === 'flag'
    )
      return false;

    // 1. 주변의 지뢰 개수를 구한다.// 주변에 지뢰가 있는 경우,
    const mineCount = getMineCount(board, x, y);

    setMineBlockToBoard(board, x, y, {
      type: 'visible',
      isOpen: true,
      isMine: false,
      mineCount,
    });

    // 주변에 지뢰가 없으면 주변 블록 열기
    if (mineCount === 0) {
      for (let pos of AROUND_POSITIONS) {
        const [posX, posY] = pos;

        if (x + posX >= 0 && y + posY >= 0) {
          openBlock(board, x + posX, y + posY);
        }
      }
    }
  };

  return (
    <>
      <PageTitle title="지뢰찾기" />
      <div className="overflow-hidden relative inline-block p-[20px] rounded-sm bg-[#c2d5ff]">
        <h3 className="text-lg font-bold">Minesweeper - 초급</h3>
        <div className="flex justify-between items-center my-5">
          <span className="">Flag: {remainFlag}</span>
          <button
            onClick={onClickStart}
            className="flex items-center justify-center p-2 rounded-sm"
            style={{
              ...getMineButtonColor(gameStatus),
            }}
          >
            {gameStatus === 'FAIL' && <Frown />}
            {gameStatus === 'CONTINUE' && <Laugh />}
            {gameStatus === 'SUCCESS' && <PartyPopper />}
          </button>
          <span className="time">
            {dayjs.duration(time, 'seconds').format('HH:mm:ss')}
          </span>
        </div>
        {board.map((row, rowIndex) => (
          <div key={`mine-row-${rowIndex}`} className="flex">
            {row.map((cell, cellIndex) => {
              const { type, mineCount } = cell;

              return (
                <button
                  key={`block-${cellIndex}`}
                  // blockType={cell.type as MineType}
                  // mineCount={mineCount}
                  className="flex justify-center items-center w-[35px] h-[35px] m-[1px] rounded-sm outline-none border-none"
                  style={{
                    backgroundColor: getBlockColor(cell.type),
                  }}
                  onClick={(e) => onClickBlock(e, cellIndex, rowIndex)}
                  onContextMenu={(e) => onClickBlock(e, cellIndex, rowIndex)}
                >
                  {mineCount > 0 && mineCount}
                  {(type === 'mine' || type === 'explodedMine') && <Bomb />}
                  {(type === 'flag' || type === 'explodedFlag') && <Flag />}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
};

export default MineSweeperBoard;

const getBlockColor = (type: MineType) => {
  switch (type) {
    case 'inVisible':
      return '#031349';
    case 'visible':
    case 'mine':
      return '#e2e2e2';
    case 'explodedMine':
    case 'explodedFlag':
      return 'red';
    case 'flag':
      return 'orange';
  }
};

const getMineButtonColor = (status: GameStatus) => {
  switch (status) {
    case 'FAIL':
      return {
        backgroundColor: '#eeff1f',
      };
    case 'CONTINUE':
      return {
        backgroundColor: '#ffffff',
      };
    case 'SUCCESS':
      return {
        backgroundColor: '#0072ff',
        color: '#ffffff',
      };
  }
};