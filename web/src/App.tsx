import Button from "./components/Button"
import Card from "./components/Card"
import CardTitle from "./components/CardTitle"
import Input from "./components/Input"
import LinkRow from "./components/LinkRow"
import Logo from "./assets/logo.svg"

function App() {

  return (
    <div className="p-10 h-screen gap-6 bg-gray-200">
      <div className="max-w-[980px] mt-14 mx-auto mb-8">
        <img src={Logo} alt="logomarca" width='97px' />
      </div>
      <div className="flex gap-5 max-w-[980px] mx-auto">
        <Card className="max-w-[380px] w-full h-fit">
          <div className="flex flex-col gap-6">
            <CardTitle title="Novo Link" />
            <Input name="original_link" type="text" label="LINK ORIGINAL" autoFocus placeholder="www.example.com.br" autoComplete="off" />
            <Input name="short_link" type="text" label="LINK ENCURTADO" placeholder="brev.ly/" autoComplete="off" />
            <Button label="Salvar Link" onClick={() => console.log('secondary-trash')} />
          </div>
        </Card>

        <Card className="w-full">
          <div className="flex flex-col gap-4">
            <CardTitle title="Meus links" hasIcon />
            <div className="w-full h-[1px] bg-gray-200 mt-1" />
            <LinkRow />
            <div className="w-full h-[1px] bg-gray-200" />
            <LinkRow />
            <div className="w-full h-[1px] bg-gray-200" />
            <LinkRow />
            <div className="w-full h-[1px] bg-gray-200" />
            <LinkRow />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default App
