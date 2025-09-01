
import Button from './Button'

export default function LinkRow() {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex flex-col gap-2'>
        <span className='text-base text-blue-base font-semibold'>brev.ly/portfolio-dev</span>
        <span className='text-sm text-gray-500'>linkedin.com/in/myprofile</span>
      </div>
      <div className='flex items-center gap-5'>
        <span className='text-sm text-gray-500'>30 acessos</span>
        <div className='flex gap-1'>
          <Button variant='secondary' icon='CopyIcon' />
          <Button variant='secondary' icon='TrashIcon' />
        </div>
      </div>
    </div>
  )
}
