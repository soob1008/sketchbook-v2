'use server';

interface FetchDataRequest {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  token?: string;
  cache?: RequestCache;
}

export async function fetchData(endpoint: string, { method = 'GET', body, headers, token, cache }: FetchDataRequest) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const url = `${apiUrl}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...headers,
  };

  const options: RequestInit = {
    method,
    headers: defaultHeaders,
    cache: cache ?? 'force-cache', // ← 기본값은 'force-cache'
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error(`[fetchData] API 오류: ${res.statusText}`);
      return {
        status: res.status,
        error: data?.message || 'API 요청 실패',
      };
    }

    return { status: res.status, data };
  } catch (error: any) {
    console.error(`[fetchData] API 요청 오류: ${error.message}`);

    return { status: 500, message: error.message };
  }
}