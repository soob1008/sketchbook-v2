import SubwayJamChart from '@/components/feature/subway_jam/chart/SubwayJamChart';
import { Jam } from '@/components/feature/subway_jam/type';

interface SubwayCarJamProps {
  jam: Jam;
}

export default function SubwayCarJam({ jam }: SubwayCarJamProps) {
  return (
    <div>
      <SubwayJamChart jam={jam} />
    </div>
  );
}