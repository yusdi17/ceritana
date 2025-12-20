import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProvinsiItem from './provinsi-item'
import { deletePulau, getPulau } from '../../../service/pulauService';
import { toast } from 'react-toastify';
import ConfirmDialog from '../../components/confirmDialog';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
export default function ManageProvinsiPage() {

  const queryClient = useQueryClient();

  const {
    data: pulau = [],
  } = useQuery({
    queryKey: ["pulau"],
    queryFn: getPulau,
  });

  const [selectedId, setSelectedId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const delMutation = useMutation({
    mutationFn: (id) => deletePulau(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pulau"] });
      setConfirmOpen(false);
      setSelectedId(null);
      toast.success("Pulau berhasil dihapus");
    },
    onError: (err) => {
      const msg = err?.response?.data?.message || "Gagal menghapus pulau";
      setConfirmOpen(false);
      setSelectedId(null);
      toast.error(msg);
    },
  });

  const askDelete = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleDelete = () => {
    if (!selectedId) return;
    delMutation.mutate(selectedId);
  };


  return (
    <>
      <header className="flex items-center justify-between gap-[30px]">
        <div>
          <h1 className="font-extrabold text-[28px] leading-[42px]">Manage Pulau</h1>
          <p className="text-[#838C9D] mt-[1]">Selau ada cerita di setiap daerahnya</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/dashboard/provinsi/create" className="w-fit rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#662FFF] text-nowrap">
            Add Pulau
          </Link>
        </div>
      </header>
      <section id="CourseList" className="flex flex-col w-full rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]">
        {pulau.map((u) => (
          <ProvinsiItem key={u.id} id={u.id} name={u.name} onDelete={askDelete} />
        ))}
        <ConfirmDialog
          open={confirmOpen}
          title="Hapus Pulau?"
          description="Tindakan ini akan menghapus pulau. Lanjutkan?"
          confirmText="Hapus"
          cancelText="Batal"
          isLoading={delMutation.isPending}
          onClose={() => {
            if (!delMutation.isPending) {
              setConfirmOpen(false);
              setSelectedId(null);
            }
          }}
          onConfirm={handleDelete}
        />
      </section>
    </>
  )
}
