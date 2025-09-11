import { useMutation } from '@tanstack/react-query'
import { api } from '../libs/axios'

interface GenerateReportResponse {
  reportUrl: string
  objectKey: string
}

export function useGenerateReport() {
  return useMutation<GenerateReportResponse, Error, void>({
    mutationFn: async () => {
      const response = await api.post('/reports/generate')
      return response.data as GenerateReportResponse
    },
  })
} 