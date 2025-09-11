import Button from './Button'

interface CardTitleProps {
  title: string
  hasIcon?: boolean;
  mutationCSV?: any;
}

export default function CardTitle({ title, hasIcon = false, mutationCSV }: CardTitleProps) {
  const handleDownload = async () => {
    try {
      const result = await mutationCSV.mutateAsync()
      const url = result.reportUrl

      const link = document.createElement('a')
      link.href = url
      link.download = ''
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Erro ao gerar/baixar relatório CSV:', error)
    }
  }

  return (
    <div className='flex justify-between items-center'>
      <h2 className='text-lg text-gray-600 font-bold'>{title}</h2>
      {hasIcon && (
        <Button
          variant='secondary'
          icon='DownloadIcon'
          label={mutationCSV.isPending ? 'Gerando...' : 'Baixar CSV'}
          onClick={handleDownload}
          disabled={mutationCSV.isPending}
        />
      )}
    </div>
  )
}
