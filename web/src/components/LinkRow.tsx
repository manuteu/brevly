
import Button from './Button'

export default function LinkRow() {
  return (
    <div className='flex justify-between items-center gap-5 py-0.5'>
      <div className='flex-1'>
        <div className='flex flex-col gap-1 md:w-full max-w-[157px]'>
          <span className='text-base text-blue-base font-semibold truncate'>brev.ly/portfolio-dev</span>
          <span className='text-sm text-gray-500 truncate'>linkedin.com/in/myprofile</span>
        </div>
      </div>
      <span className='text-sm text-gray-500'>30 acessos</span>
      <div className='flex gap-1'>
        <Button variant='secondary' icon='CopyIcon' />
        <Button variant='secondary' icon='TrashIcon' />
      </div>
    </div>
  )
}
