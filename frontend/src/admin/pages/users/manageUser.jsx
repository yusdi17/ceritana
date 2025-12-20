import React from 'react'
import UserItem from './user-item'
import { getUser } from '../../../service/userService';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../service/userService';
import ConfirmDialog from '../../components/confirmDialog';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
export default function ManageUser() {

  const queryClient = useQueryClient();
  
    const {
      data: users = [],
    } = useQuery({
      queryKey: ["pulau"],
      queryFn: getUser,
    });
  
    const [selectedId, setSelectedId] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
  
    const delMutation = useMutation({
      mutationFn: (id) => deleteUser(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["pulau"] });
        setConfirmOpen(false);
        setSelectedId(null);
        toast.success("User berhasil dihapus");
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
    <section id="CourseList" className="flex flex-col w-full rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]">
      {users.map((u) => (
        <UserItem key={u.id} id={u.id} name={u.name} role={u.role} onDelete={askDelete}/>
      ))}
      <ConfirmDialog
        open={confirmOpen}
        title="Hapus User?"
        description="Tindakan ini akan menghapus user secara permanen. Lanjutkan?"
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
  )
}
