import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET(request: Request) {
  return NextResponse.json({ message: 'AI 여행 추천 API입니다.' });
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: '추천 받고 싶은 여행 관련 질문을 추가해주세요.' },
        { status: 400 }
      );
    }

    const chatResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // gpt-3.5-turbo
      messages: [
        {
          role: 'system',
          content:
            '당신은 여행 추천 전문가입니다. 여행과 관련된 질문만 답변하세요.',
        },
        { role: 'user', content: message },
      ],
      max_tokens: 300,
    });

    const recommendation =
      chatResponse.choices[0]?.message?.content || '추천할 여행지가 없습니다.';

    return NextResponse.json({ recommendation });
  } catch (error) {
    console.error('OpenAI API 요청 오류:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}