import SubwayJamChart from '@/features/subway_jam/chart/SubwayJamChart';
import { Jam } from '@/features/subway_jam/type';
import { useFormContext } from 'react-hook-form';

interface SubwayCarJamProps {
  jam: Jam;
}

export default function SubwayCarJam({ jam }: SubwayCarJamProps) {
  const { getValues } = useFormContext();
  return (
    <section className="w-full p-4 border border-gray-200 rounded">
      {jam ? (
        <>
          <p className="font-semibold">
            {getValues('line')}호선 {getValues('station')}역 {getValues('dateType')}
          </p>
          <SubwayJamChart jam={jam} />
          <p className="mt-3 text-sm font-semibold text-blue-800">
            '보통'은 80~130%, '주의'는 130~150%, '혼잡'은 150% 이상일 때를 나타냅니다.
          </p>
        </>
      ) : (
        <div className="flex  h-[300px]">
          <p className="text-sm text-gray-500">
            지하철 혼잡도를 확인할 <strong>요일, 호선, 역</strong>을 선택해 주세요.
          </p>
        </div>
      )}
    </section>
  );
}
