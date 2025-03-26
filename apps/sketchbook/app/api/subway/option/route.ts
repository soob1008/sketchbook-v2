import { NextRequest, NextResponse } from 'next/server';
import subwayJamData from '@/public/subway.json';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const line = searchParams.get('line');

    const stations = new Set(
      subwayJamData
        .filter((item) => String(item['호선']) === line)
        .map((item) => item['출발역'])
        .sort((a, b) => a.localeCompare(b))
    );

    const times = Object.keys(subwayJamData[0]).filter((key) =>
      /^[0-9]{1,2}시[0-9]{2}분$/.test(key)
    );

    return NextResponse.json({
      stations: [...stations],
      times,
    });
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch RSS feed' },
      { status: 500 }
    );
  }
}