import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select';
import { SUBWAY_LINE_OPTIONS } from '@/components/feature/subway_jam/const';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { OptionItem } from '@/models/common';
import { fetchData } from '@/lib/api/apiClient';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Button } from '@workspace/ui/components/button';

interface SearchFilterProps {
  // line: string;
  // setLine: Dispatch<SetStateAction<string>>;
}

export default function SearchFilter() {
  const [stationOptions, setStationOptions] = useState([]);
  const [timeOptions, setTimeOptions] = useState([]);
  const { control } = useFormContext();
  const line = useWatch({
    control,
    name: 'line',
  });
  const station = useWatch({
    control,
    name: 'station',
  });
  const time = useWatch({
    control,
    name: 'time',
  });

  useEffect(() => {
    if (!line) return;
    (async () => {
      const { data } = await fetchData(`/api/subway/option?line=${line}`, {
        method: 'GET',
      });

      const stationOpt = data.stations.map((station) => ({
        label: station,
        value: station,
      }));

      const timeOpt = data.times.map((time) => ({
        label: time,
        value: time,
      }));

      setStationOptions(stationOpt);
      setTimeOptions(timeOpt);
    })();
  }, [line]);

  console.log(timeOptions);

  return (
    <>
      <h3 className="mb-3 font-bold font-sm">지하철 호선, 시간대 검색</h3>
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
                <SelectItem value="주말">주말</SelectItem>
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
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={!line}
            >
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
        <Controller
          control={control}
          name="time"
          render={({ field }) => (
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={!line}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="시간대를 선택해주세요." />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time, index) => (
                  <SelectItem key={`time_${index}`} value={time.value}>
                    {time.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <Button type="submit" disabled={!(line && station && time)}>
          검색
        </Button>
      </div>
    </>
  );
}