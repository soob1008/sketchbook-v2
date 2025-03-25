'use client';

import PageTitle from '@/components/ui/title';
import SearchFilter from '@/components/feature/subway_jam/SearchFilter';
import SubwayCarJam from '@/components/feature/subway_jam/SubwayCarJam';
import SubwayPassengerFlow from '@/components/feature/subway_jam/SubwayPassengerFlow';
import { FormProvider, useForm } from 'react-hook-form';
import { fetchData } from '@/lib/api/apiClient';

export default function SubwayJamPage() {
  const form = useForm({
    defaultValues: {
      line: '',
      station: '',
      dateType: '평일',
      time: '',
    },
  });
  const { getValues } = form;

  const handleSubmit = async () => {
    const { line, station, dateType } = getValues();

    const { data } = await fetchData(
      `/api/subway/jam?line=${line}&station=${station}&dateType=${dateType}`,
      {
        method: 'GET',
      }
    );
    console.log('submit', data);
  };

  return (
    <div>
      <PageTitle
        title="지하철 혼잡도"
        description="지하철 호선과 시간대를 검색하여 선택된 열차 칸의 혼잡도와 전체 유동인구 흐름을 확인할 수 있습니다."
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <SearchFilter />
        </form>
      </FormProvider>
      <div className="flex mt-10">
        <SubwayCarJam />
        <SubwayPassengerFlow />
      </div>
    </div>
  );
}