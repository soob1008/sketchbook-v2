'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@workspace/ui/components/input';
import { Textarea } from '@workspace/ui/components/textarea';
import { Button } from '@workspace/ui/components/button';
import PageTitle from '@/components/ui/title';
import { toast } from '@workspace/ui/hooks/use-toast';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    if (!title || !content) {
      toast({ title: '제목과 내용을 모두 입력해주세요.', variant: 'destructive' });
      return;
    }

    const slug = title.toLowerCase().replace(/\s+/g, '-');

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, slug }),
      });

      if (!res.ok) throw new Error('글 작성 실패');

      toast({ title: '글이 작성되었습니다 ✅' });
      router.push('/board');
    } catch (err) {
      toast({ title: '작성 중 에러 발생 ❌', variant: 'destructive' });
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <PageTitle title="새 글 작성" />

      <div className="space-y-2">
        <Input placeholder="제목을 입력하세요" value={title} onChange={e => setTitle(e.target.value)} />
        <Textarea
          placeholder="내용을 입력하세요"
          rows={10}
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={!title || !content}>
          작성 완료
        </Button>
      </div>
    </div>
  );
}
