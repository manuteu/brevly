import { useMutation } from '@tanstack/react-query';
import { api } from '../libs/axios';
import type { CreateShortUrlData } from '../types';

export function useCreateShortUrl() {
  return useMutation({
    mutationFn: async (data: CreateShortUrlData) => {
      const response = await api.post(`/shorten`, data);
      return response;
    },
  });
}
