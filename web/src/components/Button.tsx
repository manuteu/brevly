export default function Button() {
  return (
    <button
      className="w-[352px] p-4 cursor-pointer bg-blue-base
     text-white rounded-lg hover:bg-blue-dark transition-color duration-300
     disabled:bg-blue-base/50
     "
     onClick={() => console.log('ola')}
    >
      olá
    </button>
  )
}
