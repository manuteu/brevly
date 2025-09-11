import { useParams } from 'react-router-dom'
import Card from "../components/Card"
import LogoIcon from '../assets/logo_icon.svg'
import { useRedirect } from '../hooks/useRedirect'

export default function Redirect() {
  const { shortCode } = useParams<{ shortCode: string }>()
  const { error } = useRedirect(shortCode || '')

  return (
    <main className='bg-gray-200'>
      <div className="mx-auto max-w-xl flex h-screen justify-center items-center">
        <Card className="w-full h-fit">
          <div className="flex flex-col items-center gap-6 py-8 w-full">
            <div>
              <img src={LogoIcon} width={48} alt="Brevly Logo" />
            </div>
            {error ? (
              <>
                <span className="text-xl text-gray-600">
                  {error}
                </span>
                <div className="text-center space-y-1">
                  <p className="text-base text-gray-500 font-semibold">
                    Redirecionando para a página inicial...
                  </p>
                  <p className="text-base text-gray-500 font-semibold">
                    <a href="/" className="text-base text-blue-base underline">Voltar ao início</a>
                  </p>
                </div>
              </>
            ) : (
              <>
                <span className="text-xl text-gray-600">
                  Redirecionando...
                </span>
                <div className="text-center space-y-1">
                  <p className="text-base text-gray-500 font-semibold">
                    O link será aberto automaticamente em alguns instantes.
                  </p>
                  <p className="text-base text-gray-500 font-semibold">
                    Não foi redirecionado?
                    <a href="/" className="text-base text-blue-base ml-1 underline">Voltar ao início</a>
                  </p>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </main>
  )
}
