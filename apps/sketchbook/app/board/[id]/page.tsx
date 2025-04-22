import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@workspace/ui/components/card';
import { fetchData } from '@/lib/api/apiClient';
import { Button } from '@workspace/ui/components/button';
import PostDeleteButton from '@/components/feature/board/PostDeleteButton';

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { data: post } = await fetchData(`/api/posts/${id}`, {});
  if (!post) notFound();

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">게시글 상세</h2>
        <div className="space-x-2">
          <Button variant="outline" asChild>
            <Link href={`/board/${post.id}/edit`}>수정</Link>
          </Button>
          <PostDeleteButton postId={post.id} />
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">{post.title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            작성일: {new Date(post.createdAt).toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2 whitespace-pre-wrap leading-relaxed">{post.content}</CardContent>
      </Card>
    </div>
  );
}