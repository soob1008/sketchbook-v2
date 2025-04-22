'use client';

import PageTitle from '@/components/ui/title';
import SearchFilter from '@/components/feature/subway_jam/SearchFilter';
import SubwayCarJam from '@/components/feature/subway_jam/SubwayCarJam';
import SubwayPassengerFlow from '@/components/feature/subway_jam/SubwayPassengerFlow';
import { FormProvider, useForm } from 'react-hook-form';
import { fetchData } from '@/lib/api/apiClient';
import { useState } from 'react';
import { Jam } from '@/components/feature/subway_jam/type';

export default function SubwayJamPage() {
  const [jam, setJam] = useState<Jam>();
  const form = useForm({
    defaultValues: {
      line: '',
      station: '',
      dateType: '평일',
    },
  });
  const { getValues } = form;

  const handleSubmit = async () => {
    const { line, station, dateType } = getValues();

    const { data } = await fetchData(`/api/subway/jam?line=${line}&station=${station}&dateType=${dateType}`, {
      method: 'GET',
    });

    setJam(data.station);
  };

  return (
    <div>
      <PageTitle
        title="지하철 혼잡도 & 유동인구 흐름도"
        description={
          <>
            지하철 호선과 역을 검색하여 선택된 역의 혼잡도를 확인할 수 있습니다.
            <br />
            유동인구 흐름도는 시간대 별로 승객의 흐름을 볼 수 있습니다. 유동인구 흐름도는 준비중입니다.
            <br />
            <br />
            혼잡도 API : 서울 열린 데이터 광장 서울교통공사 지하철혼잡도정보 2025년 2월 데이터입니다. 1 ~ 8 호선까지만
            데이터가 제공됩니다. <br />
            유동인구 API: 서울 열린 데이터 광장 서울교통공사 시간대별 승하차인원 정보 open API 사용 예정
          </>
        }
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <SearchFilter setJam={setJam} />
        </form>

        <div className=" mt-10">
          <SubwayCarJam jam={jam} />
          <SubwayPassengerFlow />
        </div>
      </FormProvider>
    </div>
  );
}