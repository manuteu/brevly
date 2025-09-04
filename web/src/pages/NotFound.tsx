import Card from '../components/Card'
import NotFoundIcon from '../assets/404.svg'

export default function NotFound() {
  return (
    <div className="m-auto max-w-xl flex h-full justify-center items-center">
      <Card className="w-full h-fit">
        <div className="flex flex-col items-center gap-6 py-6 md:py-8 md:px-4 w-full">
          <div>
            <img src={NotFoundIcon} className='w-[164px] md:w-[194px]' />
          </div>
          <span className="text-xl text-gray-600">
            Link não encontrado
          </span>
          <div className="text-center">
            <p className="text-base text-gray-500 font-semibold">
              O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em
              <a href="" className="text-base text-blue-base ml-1 underline">brev.ly</a>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
