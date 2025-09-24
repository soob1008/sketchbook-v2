import MinesweeperContainer from '@/features/game/minesweeper/MinesweeperContainer';
import PageTitle from '@/components/ui/title';

export default function Minesweeper2Page() {
  return (
    <section>
      <PageTitle title="지뢰찾기2" />
      <MinesweeperContainer />
    </section>
  );
}
