'use server';

import { toast } from 'sonner';

interface FetchDataRequest {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  token?: string;
}

export async function fetchData(
  endpoint: string,
  { method = 'GET', body, headers, token }: FetchDataRequest = {}
) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${apiUrl}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...headers, // 사용자 지정 헤더
  };

  const options = {
    method,
    headers: defaultHeaders,
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      toast.error(res.statusText);

      return {
        status: res.status,
        error: data?.message || 'API 요청 실패',
      };
    }

    return { status: res.status, data };
  } catch (error) {
    console.error(`[fetchData] API 요청 오류: ${error.message}`);

    return { status: 500, message: error.message };
  }
}