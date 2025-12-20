import React, { useState } from 'react'
import CardCerita from './card'
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCerita, getCerita } from '../../../service/ceritaService';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import ConfirmDialog from '../../components/confirmDialog';

export default function CeritaPage() {

    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
    queryKey: ['cerita'],
    queryFn: () => getCerita({ per_page: 50, include_unpublished: true }),
  });

  const cerita = data?.data ?? [];

    const [selectedId, setSelectedId] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const delMutation = useMutation({
        mutationFn: (id) => deleteCerita(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cerita"] });
            setConfirmOpen(false);
            setSelectedId(null);
            toast.success("Cerita berhasil dihapus");
        },
        onError: (err) => {
            const msg = err?.response?.data?.message || "Gagal menghapus user";
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
                    <h1 className="font-extrabold text-[28px] leading-[42px]">Manage Cerita</h1>
                    <p className="text-[#838C9D] mt-[1]">Klik daerahnya jelajahi ceritanya</p>
                </div>
                <div className="flex items-center gap-3">
                    <Link to="/dashboard/cerita/create" className="w-fit rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#662FFF] text-nowrap">
                        Cerita Baru
                    </Link>
                </div>
            </header>
            <section id="CourseList" className="flex flex-col w-full rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]">
                {cerita.map((u) => (
                    <CardCerita
                        key={u.id}
                        id={u.id}
                        judul={u.judul}
                        thumbnail={u.thumbnail_url}
                        provinsi={u.provinsi?.name ?? "-"}
                        onDelete={askDelete}
                    />
                ))}
                <ConfirmDialog
                    open={confirmOpen}
                    title="Hapus Cerita?"
                    description="Tindakan ini akan menghapus cerita secara permanen. Lanjutkan?"
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
