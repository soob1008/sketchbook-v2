import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@workspace/ui/components/card';
import Link from 'next/link';
import { Piano } from 'lucide-react';
import PageTitle from '@/components/ui/title';

const PLAYGROUND = [
  {
    title: (
      <div className="flex items-center gap-2">
        <Piano /> 피아노 구현
      </div>
    ),
    description:
      'Web APIs AudioContext 를 이용하여 만든 피아노입니다. 연주곡을 선택해서 자동 연주가 가능합니다.',
    url: '/playground/piano',
  },
  {
    title: 'Todo list (2)',
    description: 'Zustand 를 이용한 투두리스트입니다.',
    url: '/playground/todo/zustand',
  },
  {
    title: 'Todo list (1)',
    description: 'Redux를 이용한 투두리스트입니다.',
    url: '/playground/todo/redux',
  },
];

export default function PlayGroundPage() {
  return (
    <div>
      <PageTitle
        title="Playground"
        description="만들고 싶은 것을 만듭니다."
        isBottomLine
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
        {PLAYGROUND.map((item, index) => (
          <Card key={index}>
            <CardHeader className="font-semibold">{item.title}</CardHeader>
            <CardContent>
              <p className="h-[80px] text-sm break-words">{item.description}</p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Link
                href={item.url}
                className="flex px-5 py-2 bg-black text-white rounded-sm font-semibold text-sm hover:bg-gray-700"
              >
                Go to Page
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}