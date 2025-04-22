'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Input } from '@workspace/ui/components/input';
import { Textarea } from '@workspace/ui/components/textarea';
import { Button } from '@workspace/ui/components/button';
import PageTitle from '@/components/ui/title';
import { useToast } from '@workspace/ui/hooks/use-toast';
import { fetchData } from '@/lib/api/apiClient';

type Post = {
  id: string;
  title: string;
  content: string;
  slug: string;
};

export default function EditPostPage() {
  const params = useParams();
  const { id } = params;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      const res = await fetch(`/api/posts/${id}`);
      if (!res.ok) {
        toast({ title: '글을 불러오지 못했습니다.', variant: 'destructive' });
        return;
      }
      const data = await res.json();
      setPost(data);
      setTitle(data.title);
      setContent(data.content);
      setLoading(false);
    };

    (async () => {
      await fetchPost();
    })();
  }, [id]);

  const handleUpdate = async () => {
    if (!title || !content) {
      toast({ title: '제목과 내용을 모두 입력해주세요.', variant: 'destructive' });
      return;
    }

    const { status } = await fetchData(`/api/posts/${id}`, {
      method: 'PUT',
      body: { title, content },
    });

    if (status !== 200) {
      toast({ title: '수정에 실패했습니다.', variant: 'destructive' });
      return;
    }

    toast({ title: '글이 수정되었습니다.' });
    router.push(`/board/${id}`);
  };

  if (loading || !post) {
    return <div className="p-6 text-center text-muted-foreground">로딩 중...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <PageTitle title="글 수정" />
      <div className="space-y-2">
        <Input placeholder="제목" value={title} onChange={e => setTitle(e.target.value)} />
        <Textarea placeholder="내용" rows={10} value={content} onChange={e => setContent(e.target.value)} />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleUpdate} disabled={!title || !content}>
          수정 완료
        </Button>
      </div>
    </div>
  );
}
