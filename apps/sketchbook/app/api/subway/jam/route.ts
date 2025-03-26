import { NextRequest, NextResponse } from 'next/server';
import subwayJamData from '@/public/subway.json';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const line = searchParams.get('line');
    const dateType = searchParams.get('dateType');
    const station = searchParams.get('station');

    const filtered = subwayJamData.find((item) => {
      return (
        String(item['호선']) === line &&
        item['요일구분'] === dateType &&
        item['출발역'] === station
      );
    });

    return NextResponse.json({
      station: filtered,
    });
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch RSS feed' },
      { status: 500 }
    );
  }
}