import Link from 'next/link';
import { Card, CardContent } from '@workspace/ui/components/card';
import { Button } from '@workspace/ui/components/button';
import PageTitle from '@/components/ui/title';
import { fetchData } from '@/lib/api/apiClient';
import type { Post } from '@/app/board/[id]/edit/page';

export default async function BoardPage() {
  const { data: posts } = await fetchData(`/api/posts`, {
    cache: 'no-store',
  });

  if (!posts) {
    return <p className="text-gray-500">게시글을 불러오는 데 실패했습니다.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <PageTitle title="게시판" />
        <Link href="/board/new">
          <Button>글쓰기</Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500">아직 작성된 게시글이 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post: Post) => (
            <Link href={`/board/${post.id}`} key={post.id}>
              <Card className="cursor-pointer hover:shadow-md transition">
                <CardContent className="p-4 space-y-1">
                  <h2 className="text-lg font-semibold">{post.title}</h2>
                  <p className="text-sm text-muted-foreground truncate">{post.content}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
