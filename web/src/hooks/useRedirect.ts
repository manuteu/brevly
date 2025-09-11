import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../libs/axios'

interface RedirectResponse {
  originalUrl: string
}

export function useRedirect(shortCode: string) {
  const navigate = useNavigate()
  const hasRedirected = useRef(false)

  const {
    data,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['redirect', shortCode],
    queryFn: async () => {
      const response = await api.get<RedirectResponse>(`shorten/${shortCode}`)
      return response.data
    },
    enabled: !!shortCode && !hasRedirected.current,
    retry: false,
    staleTime: 0,
    gcTime: 0, // Não cachear para evitar problemas
  })

  useEffect(() => {
    if (data?.originalUrl && !hasRedirected.current) {
      hasRedirected.current = true
      // Redireciona para a URL original
      window.location.href = data.originalUrl
    }
  }, [data])

  useEffect(() => {
    if (isError && !hasRedirected.current) {
      hasRedirected.current = true
      // Redireciona para 404 após 2 segundos
      setTimeout(() => {
        navigate('/404')
      }, 2000)
    }
  }, [isError, navigate])

  return { 
    isLoading, 
    error: isError ? 'Link não encontrado ou inválido' : null 
  }
}
