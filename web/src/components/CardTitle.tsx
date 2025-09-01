import Button from './Button'

interface CardTitleProps {
  title: string
  hasIcon?: boolean
}

export default function CardTitle({ title, hasIcon = false }: CardTitleProps) {
  return (
    <div className='flex justify-between items-center'>
      <h2 className='text-lg text-gray-600 font-bold'>{title}</h2>
      {hasIcon && <Button variant='secondary' icon='DownloadIcon' label='Baixar CSV' />}
    </div>
  )
}
