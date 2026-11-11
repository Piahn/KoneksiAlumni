import { useState, useCallback } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(apiFunc: (...args: any[]) => Promise<{ data?: T; message?: string }>) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const response = await apiFunc(...args);
        const result = (response.data !== undefined ? response.data : response) as T;
        setState({ data: result, loading: false, error: null });
        return result;
      } catch (err: any) {
        const errMsg = err?.message || 'Terjadi kesalahan sistem';
        setState({ data: null, loading: false, error: errMsg });
        return null;
      }
    },
    [apiFunc]
  );

  return { ...state, execute, setData: (data: T | null) => setState((prev) => ({ ...prev, data })) };
}

