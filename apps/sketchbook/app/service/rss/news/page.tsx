import PageTitle from '@/components/ui/title';
import { fetchData } from '@/lib/api/apiClient';
import Link from 'next/link';
import { Feeds } from '@/app/api/rss/news/route';
import { format } from 'date-fns';

export default async function RssNewsPage() {
  const { data } = await fetchData('/api/rss/news', {
    method: 'GET',
    cache: 'no-store',
  });

  if (!data) return;
  const { siteTitle, lastBuildDate, feeds } = data as Feeds;

  return (
    <>
      <PageTitle title={siteTitle} description={<>업데이트 일시 : {format(lastBuildDate, 'yyyy-MM-dd HH:mm')}</>} />
      <div className="flex flex-col gap-4 mt-5">
        {feeds.map(feed => (
          <Link href={feed.link} key={feed.id} className="border border-gray-200 py-4 px-6 rounded-sm" target="_blank">
            <div className="flex justify-between">
              <h3 className="font-bold">{feed.title}</h3>
              <div className="flex flex-col items-end text-sm text-gray-600">
                <span>{feed.author}</span>
                <span>{format(feed.pubDate, 'yyyy-MM-dd HH:mm')}</span>
              </div>
            </div>
            <p className="mt-3 text-sm">{feed.contentSnippet}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
