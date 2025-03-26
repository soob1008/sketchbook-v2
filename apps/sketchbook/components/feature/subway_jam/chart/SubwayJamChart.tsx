import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { parse } from 'date-fns';
import { Jam } from '@/components/feature/subway_jam/type';
import { getSubwayLineColor } from '@/components/feature/subway_jam/util';

interface SubwayJamChartProps {
  jam: Jam;
}
export default function SubwayJamChart({ jam }: SubwayJamChartProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!jam) return;

    const data = getTimeFormatJamArr(jam as any);

    const marginLeft = 40;
    const marginBottom = 40;
    const marginRight = 40;
    const width = 800;
    const height = 300;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // x축 설정
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.timeStr))
      .range([marginLeft, width - marginRight])
      .padding(0.1);

    // x축 눈금 그리기
    svg
      .append('g')
      .attr('transform', `translate(0, ${height - marginBottom})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    // y축 설정
    const yScale = d3
      .scaleLinear()
      .domain([0, 200])
      .range([height - marginBottom, 20]);

    // y축 눈금 그리기
    svg
      .append('g')
      .attr('transform', `translate(${marginLeft}, 0)`)
      .call(d3.axisLeft(yScale));

    // 막대 그리기
    svg
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d) => xScale(d.timeStr)!)
      .attr('y', (d) => yScale(d.jam))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - marginBottom - yScale(d.jam))
      .attr('fill', getSubwayLineColor(jam.호선));
  }, [jam]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
}

function getTimeFormatJamArr(jam: Record<string, number>) {
  const timeRegex = /^\d{1,2}시\d{2}분$/;

  return Object.entries(jam)
    .filter(([key]) => timeRegex.test(key))
    .map(([key, value]) => {
      const timeStr = key.replace('시', ':').replace('분', '');
      const date = parse(timeStr, 'HH:mm', new Date());
      return { timeStr: key, time: date, jam: value };
    })
    .filter((d) => !isNaN(d.time.getTime())) // 유효한 날짜만
    .sort((a, b) => a.time.getTime() - b.time.getTime()); // 시간순 정렬
}