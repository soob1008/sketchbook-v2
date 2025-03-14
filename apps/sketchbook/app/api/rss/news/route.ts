import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

export interface Feeds {
  siteTitle: string;
  lastBuildDate: Date;
  feeds: Feed[];
}

export interface Feed {
  id: string;
  title: string;
  link: string;
  pubDate: Date;
  author: string;
  content: string;
  contentSnippet: string;
}

export async function GET() {
  const parser = new Parser();

  try {
    const feed = await parser.parseURL(
      'https://feeds.feedburner.com/geeknews-feed'
    );

    return NextResponse.json({
      siteTitle: feed.title,
      lastBuildDate: feed.lastBuildDate,
      feeds: feed.items || [],
    });
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return NextResponse.json(
      { error: 'Failed to fetch RSS feed' },
      { status: 500 }
    );
  }
}