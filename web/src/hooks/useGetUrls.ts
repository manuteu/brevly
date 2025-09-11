import { useQuery } from '@tanstack/react-query';
import { api } from '../libs/axios';
import type { ShortUrl } from '../types';

export function useGetUrls() {
  return useQuery<ShortUrl[]>({
    queryKey: ['shortUrls'],
    queryFn: async () => {
      const response = await api.get('/shorten');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
  });
}
