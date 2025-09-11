import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { shortUrlSchema, type ShortUrlFormData } from '../schemas/shortUrlSchema';
import { useCreateShortUrl } from '../hooks/useCreateShortUrl';
import Button from './Button';
import Card from './Card';
import CardTitle from './CardTitle';
import Input from './Input';

interface ShortUrlFormProps {
  onSuccess?: () => void;
}

export function ShortUrlForm({ onSuccess }: ShortUrlFormProps) {
  const mutationCreateShortUrl = useCreateShortUrl();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ShortUrlFormData>({
    resolver: zodResolver(shortUrlSchema),
    defaultValues: {
      originalUrl: '',
      shortCode: '',
    },
  });

  const onSubmit = async (data: ShortUrlFormData) => {
    try {
      await mutationCreateShortUrl.mutateAsync(data);
      reset();
      onSuccess?.();
    } catch (error) {
      console.error('Erro ao criar URL encurtada:', error);
    }
  };

  return (
    <Card className="w-full md:max-w-[380px] md:min-w-[380px] h-fit">
      <div className="flex flex-col gap-5 md:gap-6">
        <CardTitle title="Novo Link" />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            {...register('originalUrl')}
            name="original_link"
            type="text"
            label="LINK ORIGINAL"
            autoFocus
            placeholder="www.example.com.br"
            autoComplete="off"
            error={errors.originalUrl?.message}
          />
          <Input
            {...register('shortCode')}
            name="short_link"
            type="text"
            label="LINK ENCURTADO"
            placeholder="brev.ly/"
            autoComplete="off"
            error={errors.shortCode?.message}
          />
          <Button 
            label="Salvar Link" 
            type="submit"
            disabled={isSubmitting}
          />
        </form>
      </div>
    </Card>
  );
}
