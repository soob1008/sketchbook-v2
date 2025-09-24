'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@workspace/ui/components/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@workspace/ui/components/alert-dialog';
import { toast } from '@workspace/ui/hooks/use-toast';
import { fetchData } from '@/lib/api/apiClient';

export default function PostDeleteButton({ postId }: { postId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const { status } = await fetchData(`/api/posts/${postId}`, { method: 'DELETE' });

    if (status !== 200) {
      toast({ title: '삭제 실패', variant: 'destructive' });
      return;
    }

    toast({ title: '삭제되었습니다.' });
    router.push('/board');
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="text-destructive">
          삭제
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>이 작업은 되돌릴 수 없습니다. 게시글이 영구히 삭제됩니다.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive text-white hover:bg-destructive/90" onClick={handleDelete}>
            삭제 확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}