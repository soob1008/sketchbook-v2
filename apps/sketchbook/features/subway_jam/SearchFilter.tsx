import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select';
import { SUBWAY_LINE_OPTIONS } from '@/features/subway_jam/const';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { fetchData } from '@/lib/api/apiClient';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Button } from '@workspace/ui/components/button';
import { Jam } from '@/features/subway_jam/type';

interface SearchFilterProps {
  setJam: Dispatch<SetStateAction<Jam>>;
}

export default function SearchFilter({ setJam }: SearchFilterProps) {
  const [stationOptions, setStationOptions] = useState([]);

  const { control, resetField } = useFormContext();
  const line = useWatch({
    control,
    name: 'line',
  });
  const station = useWatch({
    control,
    name: 'station',
  });

  useEffect(() => {
    if (!line) return;
    setJam(null);
    resetField('station');

    (async () => {
      const { data } = await fetchData(`/api/subway/option?line=${line}`, {
        method: 'GET',
      });

      const stationOpt = data.stations.map(station => ({
        label: station,
        value: station,
      }));

      setStationOptions(stationOpt);
    })();
  }, [line]);

  return (
    <>
      <h3 className="mb-3 font-bold font-sm">지하철 혼잡도 필터 – 이용일 · 호선 · 역 선택</h3>
      <div className="flex gap-3">
        <Controller
          control={control}
          name="dateType"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="평일/주말" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="평일">평일</SelectItem>
                <SelectItem value="토요일">토요일</SelectItem>
                <SelectItem value="일요일">일요일</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <Controller
          control={control}
          name="line"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="호선을 선택해주세요." />
              </SelectTrigger>
              <SelectContent>
                {SUBWAY_LINE_OPTIONS.map((line, index) => (
                  <SelectItem key={`subway_line_${index}`} value={line.value}>
                    {line.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <Controller
          control={control}
          name="station"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value} disabled={!line}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="역을 선택해주세요." />
              </SelectTrigger>
              <SelectContent>
                {stationOptions.map((station, index) => (
                  <SelectItem key={`station_${index}`} value={station.value}>
                    {station.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <Button type="submit" disabled={!(line && station)}>
          검색
        </Button>
      </div>
    </>
  );
}
