import { useGetUrls } from '../hooks/useGetUrls';
import { ShortUrlForm } from '../components/ShortUrlForm';
import { ShortUrlList } from '../components/ShortUrlList';
import Logo from '../assets/logo.svg';

export function Home() {
  const { refetch } = useGetUrls();

  const handleFormSuccess = () => {
    refetch();
  };

  return (
    <div className="px-3 md:px-6 lg:px-10 py-8 h-screen w-screen bg-gray-200">
      <div className="max-w-[980px] place-self-center md:place-self-auto md:mt-14 mx-auto mb-6 md:mb-8">
        <img src={Logo} alt="logomarca" width="97px" />
      </div>
      <div className="flex flex-col gap-3 md:gap-5 max-w-[980px] mx-auto">
        <ShortUrlForm onSuccess={handleFormSuccess} />
        <ShortUrlList />
      </div>
    </div>
  );
}
