import { Card, CardContent, CardFooter, CardHeader } from '@workspace/ui/components/card';
import Link from 'next/link';
import PageTitle from '@/components/ui/title';

const MINESWEEPER_LIST = [
  {
    title: '처음 만든 지뢰찾기',
    description: '초급',
    url: '/game/minesweeper/1',
  },
  {
    title: '두번째 지뢰찾기',
    description: '난이도 선택 가능',
    url: '/game/minesweeper/2',
  },
];

export default function MinesweeperPage() {
  return (
    <div>
      <PageTitle title="지뢰찾기" description="" isBottomLine />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 mt-6">
        {MINESWEEPER_LIST.map((item, index) => (
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
