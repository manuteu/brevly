import Button from './Button'

interface ILinkProps {
  shortenUrl: string;
  fullUrl: string;
  accessCount: number;
  onDelete: () => void;
  onCopy?: () => void;
}

export default function LinkRow({ accessCount, fullUrl, shortenUrl, onDelete, onCopy }: ILinkProps) {
  return (
    <div className='flex w-full items-center gap-5 py-0.5'>
      <div className='flex-1 min-w-0 overflow-hidden'>
        <div className='flex flex-col gap-1'>
          <span className='text-base text-blue-base font-semibold truncate block'>{shortenUrl}</span>
          <span className='text-sm text-gray-500 truncate block'>{fullUrl}</span>
        </div>
      </div>
      <span className='text-sm text-gray-500 whitespace-nowrap flex-shrink-0'>{accessCount} acessos</span>
      <div className='flex gap-1 flex-shrink-0'>
        <Button variant='secondary' icon='CopyIcon' onClick={onCopy} />
        <Button variant='secondary' icon='TrashIcon' onClick={onDelete} />
      </div>
    </div>
  )
}