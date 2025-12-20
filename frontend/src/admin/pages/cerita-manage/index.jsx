import { getCeritaById, getProvinsi, postCerita, updateCerita } from '../../../service/ceritaService';
import { useNavigate, useParams } from 'react-router-dom';
import { ceritaSchema } from '../../../utils/zodSchema';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import CreateCeritaPage from '../cerita-create';

export default function ManageCerita() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: provinsi = [] } = useQuery({ queryKey: ['provinsiOptions'], queryFn: getProvinsi });
  const { data: detail, isLoading } = useQuery({
    queryKey: ['ceritaDetail', id],
    queryFn: () => getCeritaById(id),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (form) => updateCerita(id, form),
  });

  if (isLoading) return <p>Memuat…</p>;

  const defaultValues = {
    id: detail.id,
    judul: detail.judul ?? '',
    provinsi_id: String(detail.provinsi_id ?? ''),
    is_published: detail.is_published ? 'true' : 'false',
    cerita: detail.cerita ?? '',
    thumbnail: undefined,
    thumbnail_url: detail.thumbnail_url ?? null,
  };

  const onSubmit = async (form) => {
    try {
      await mutateAsync(form);
      toast.success('Cerita berhasil diperbarui');
      navigate('/dashboard/cerita');
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Gagal memperbarui cerita');
    }
  };
  return (
    <CreateCeritaPage
      schema={ceritaSchema}
      defaultValues={defaultValues}
      provinsiOptions={provinsi}
      onSubmit={onSubmit}
      isSubmitting={isPending}
      submitText="Update Now"
      apiKeyTiny="v0ogmyye1l91uf87s0ry1gp45awlwblwjoaggk5ax602nnax"
    />
  )
}
