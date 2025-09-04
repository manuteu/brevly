import Card from "../components/Card";
import LogoIcon from '../assets/logo_icon.svg';

export default function Redirect() {
  return (
    <div className="m-auto max-w-xl flex h-full justify-center items-center">
      <Card className="w-full h-fit">
        <div className="flex flex-col items-center gap-6 py-8 w-full">
          <div>
            <img src={LogoIcon} width={48} />
          </div>
          <span className="text-xl text-gray-600">
            Redirecionando...
          </span>
          <div className="text-center space-y-1">
            <p className="text-base text-gray-500 font-semibold">
              O link será aberto automaticamente em alguns instantes.
            </p>
            <p className="text-base text-gray-500 font-semibold">
              Não foi redirecionado?
              <a href="" className="text-base text-blue-base ml-1 underline">Acesse aqui</a>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
