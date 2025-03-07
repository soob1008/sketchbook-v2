'use client';

import PageTitle from '@/components/ui/title';
import { Input } from '@workspace/ui/components/input';
import { Button } from '@workspace/ui/components/button';
import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { fetchData } from '@/lib/api/apiClient';
import { Loader2 } from 'lucide-react';

type FormValues = {
  message: string;
};

export default function TravelPage() {
  const form = useForm<FormValues>({
    defaultValues: {
      message: '',
    },
  });
  const {
    register,
    getValues,
    watch,
    formState: { isValid },
  } = form;
  const [recommendation, setRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitRecommend = async () => {
    setIsLoading(true);
    const { message } = getValues();

    const { status, data } = await fetchData('/sketchbook-v2/api/recommend', {
      method: 'POST',
      body: {
        message,
      },
    });

    if (status === 200) {
      setRecommendation(data.recommendation);
    }

    if (status) {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageTitle
        title="AI 여행지 추천"
        description={
          <>
            ChatGPT(OpenAI)를 활용한 맞춤형 여행지 추천 기능입니다. <br />
            사용자가 원하는 여행 스타일을 입력하면, AI가 최적의 여행지를 추천해
            줍니다.
          </>
        }
      />
      <div className="w-1/2">
        <h3 className="font-semibold mb-2">어떤 여행을 떠나고 싶나요?</h3>
        <FormProvider {...form}>
          <div className="flex items-center gap-2">
            <Input
              {...register('message')}
              placeholder="예) 유럽 소도시 추천해줘"
            />
            <Button
              disabled={!watch('message')}
              onClick={handleSubmitRecommend}
            >
              여행지 추천 받기
            </Button>
          </div>
        </FormProvider>
      </div>
      <div className="relative p-4 h-[250px] mt-6 border rounded">
        {recommendation ? (
          <p className="text-[14px] break-words">{recommendation}</p>
        ) : (
          <p className="text-sm text-gray-500">
            가고 싶은 여행 스타일을 입력하고 <strong>여행지 추천 받기</strong>{' '}
            버튼을 눌러주세요.
          </p>
        )}

        {isLoading && (
          <div className="absolute top-0 bottom-0 left-0 right-0  w-full h-full bg-white opacity-50">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center">
              <Loader2 className="animate-spin" />
              <p className="mt-3 text-sm">추천을 생성 중입니다...</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}