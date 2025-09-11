import { useMutation } from '@tanstack/react-query';
import { api } from '../libs/axios';


export function useDeleteUrl() {
  return useMutation({
    mutationFn: async (shortCode: string) => {
      await api.delete(`/shorten/${shortCode}`);
    },
  });
}
