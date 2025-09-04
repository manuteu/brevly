import Button from "./components/Button"
import Card from "./components/Card"
import CardTitle from "./components/CardTitle"
import Input from "./components/Input"
import LinkRow from "./components/LinkRow"
import Logo from "./assets/logo.svg"
import { useState } from "react"
import { LinkIcon } from "./libs/phosphor-icons"
// import Redirect from "./pages/Redirect"
// import NotFound from "./pages/NotFound"

function App() {
  const [hasItems, setHasItems] = useState(false)

  return (
    <div className="px-3 md:px-6 lg:px-10 py-8 h-screen w-screen bg-gray-200">
      {/* <Redirect /> */}
      {/* <NotFound /> */}
      <div className="max-w-[980px] place-self-center md:place-self-auto md:mt-14 mx-auto mb-6 md:mb-8">
        <img src={Logo} alt="logomarca" width='97px' />
      </div>
      <div className="flex flex-col md:flex-row gap-3 md:gap-5 max-w-[980px] mx-auto">
        <Card className="w-full md:max-w-[380px] h-fit">
          <div className="flex flex-col gap-5 md:gap-6">
            <CardTitle title="Novo Link" />
            <div className="flex flex-col gap-4">
              <Input name="original_link" type="text" label="LINK ORIGINAL" autoFocus placeholder="www.example.com.br" autoComplete="off" />
              <Input name="short_link" type="text" label="LINK ENCURTADO" placeholder="brev.ly/" autoComplete="off" />
            </div>
            <Button label="Salvar Link" onClick={() => console.log('secondary-trash')} />
          </div>
        </Card>

        <Card className="w-full h-fit">
          <div className="flex flex-col gap-5">
            <CardTitle title="Meus links" hasIcon />
            {hasItems ? (
              <div className="flex flex-col gap-4">
                <div className="w-full h-[1px] bg-gray-200" />
                <LinkRow />
                <div className="w-full h-[1px] bg-gray-200" />
                <LinkRow />
                <div className="w-full h-[1px] bg-gray-200" />
                <LinkRow />
                <div className="w-full h-[1px] bg-gray-200" />
                <LinkRow />
              </div>
            ) : (
              <div className="flex flex-col w-full gap-3 md:gap-4">
                <div className="w-full h-[1px] bg-gray-200" />
                <div className="flex flex-col gap-3 pt-4 pb-6 items-center">
                  <LinkIcon size={32} className="text-gray-400" />
                  <span className="text-xs text-gray-500 uppercase text-center">ainda não existem links cadastrados</span>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default App
