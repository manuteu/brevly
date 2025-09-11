import { useGetUrls } from '../hooks/useGetUrls';
import { useDeleteUrl } from '../hooks/useDeleteUrl';
import { copyToClipboard } from '../utils/copyToClipboard';
import { LinkIcon } from '../libs/phosphor-icons';
import Card from './Card';
import CardTitle from './CardTitle';
import LinkRow from './LinkRow';
import { useGenerateReport } from '../hooks/useGenerateReport';

export function ShortUrlList() {
  const { data, isLoading, error, refetch } = useGetUrls();
  const mutationDelete = useDeleteUrl();
  const mutationCSV = useGenerateReport();

  const handleConfirmDelete = async (shortenCode: string) => {
    try {
      await mutationDelete.mutateAsync(shortenCode);

      refetch()
    } catch (error) {
      console.error('Erro ao deletar URL:', error);
    }
  };

  const handleCopyShortUrl = async (shortUrl: string) => {
    await copyToClipboard(shortUrl);
  };

  if (error) {
    return (
      <Card className="w-full h-fit">
        <div className="flex flex-col gap-5">
          <CardTitle title="Meus links" hasIcon />
          <div className="flex justify-center py-8">
            <span className="text-gray-500">Erro ao carregar links</span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full h-fit md:flex-1 md:min-w-0" loading={isLoading || mutationDelete.isPending || mutationCSV.isPending}>
      <div className="flex flex-col gap-5">
        <CardTitle title="Meus links" hasIcon mutationCSV={mutationCSV} />
        {data && data.length > 0 ? (
          data.map((item) => (
            <div key={item.id} className="flex flex-col gap-4">
              <div className="w-full h-[1px] bg-gray-200" />
              <LinkRow
                accessCount={item.clicks}
                fullUrl={item.originalUrl}
                shortenUrl={item.shortUrl}
                onDelete={() => handleConfirmDelete(item.shortCode)}
                onCopy={() => handleCopyShortUrl(item.shortUrl)}
              />
            </div>
          ))
        ) : (
          <div className="flex flex-col w-full gap-3 md:gap-4">
            <div className="w-full h-[1px] bg-gray-200" />
            <div className="flex flex-col gap-3 pt-4 pb-6 items-center">
              <LinkIcon size={32} className="text-gray-400" />
              <span className="text-xs text-gray-500 uppercase text-center">
                ainda não existem links cadastrados
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
