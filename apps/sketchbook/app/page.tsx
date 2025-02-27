import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import { Checkbox } from '@workspace/ui/components/checkbox';

const TODO_LIST = [
  {
    title: '테트리스',
    href: 'tetris',
    data: [
      {
        text: '기본 로직',
        isCompleted: true,
      },
      {
        text: '로직 정리',
        isCompleted: true,
      },
      {
        text: '초기화면 만들기',
        isCompleted: false,
      },
      {
        text: '점수 계산',
        isCompleted: false,
      },
      {
        text: '레벨 로직 추가',
        isCompleted: false,
      },
      {
        text: '다음 블럭 미리보기',
        isCompleted: false,
      },
    ],
  },
  {
    title: '지뢰찾기',
    href: 'minesweeper',
    data: [
      {
        text: '기본 로직',
        isCompleted: true,
      },
      {
        text: '구현한 로직 정리',
        isCompleted: true,
      },
      {
        text: '처음 클릭시 지뢰 안나오도록 처리',
        isCompleted: false,
      },
    ],
  },
  {
    title: '투두리스트',
    href: 'todoList',
    data: [
      {
        text: 'redux toolkit 으로 구현',
        isCompleted: true,
      },
      {
        text: 'zustand 으로 구현',
        isCompleted: true,
      },
      {
        text: 'mobx 으로 구현',
        isCompleted: false,
      },
    ],
  },
  {
    title: '피아노 연주',
    href: 'piano',
    data: [
      {
        text: '피아노 건반 그리기',
        isCompleted: true,
      },
      {
        text: '피아노 건반 소리 나오게 하기',
        isCompleted: true,
      },
      {
        text: '악보 테스트 데이터 넣기',
        isCompleted: true,
      },
      {
        text: '연주 구현',
        isCompleted: true,
      },
      {
        text: '볼륨 조절',
        isCompleted: true,
      },
      {
        text: '악보 등록 UI',
        isCompleted: false,
      },
      {
        text: '악보 등록 서버 연동',
        isCompleted: false,
      },
      {
        text: '자동 연주 시 볼륨 조절 버그 수정',
        isCompleted: false,
      },
    ],
  },
  {
    title: '채팅 구현',
    href: 'chat',
    data: [
      {
        text: '-',
        isCompleted: false,
      },
    ],
  },
];
export default function Page() {
  return (
    <div className="flex flex-col min-h-svh gap-10">
      {TODO_LIST.map((list, index) => (
        <Card key={`todo-${index}`}>
          <CardHeader className="px-4 border-b border-gray-200">
            <CardTitle>{list.title}</CardTitle>
            {/*<CardDescription></CardDescription>*/}
          </CardHeader>
          <CardContent className="p-0">
            <ul className="flex flex-col">
              {list.data.map((todo, todoIndex) => (
                <li
                  key={`todo-list-${todoIndex}`}
                  className="px-4 py-3 border-b border-gray-200"
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox checked={todo.isCompleted} disabled />
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {todo.text}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
