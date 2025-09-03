import React from 'react'
import UserItem from './user-item'
import { getUser } from '../../../service/userService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../service/userService';
import ConfirmDialog from '../../components/confirmDialog';
export default function ManageUser() {


  const [users, setUsers] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const load = () => {
    getUser()
      .then((res) => setUsers(res))
      .catch((err) => {
        console.error("Failed to fetch users:", err);
        toast.error("Gagal memuat data user");
      });
  };

  useEffect(() => {
    load();
  }, []);

  const askDelete = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };
  const handleDelete = async (id) => {
    if (!deleteId) return;
    try {
      setIsDeleting(true);
      await deleteUser(deleteId);
      setUsers((prev) => prev.filter((u) => u.id !== deleteId));
      toast.success("User berhasil dihapus");
    } catch (err) {
      const msg = err?.response?.data?.message || "Gagal menghapus user";
      toast.error(msg);
      console.error(err);
    } finally {
      setIsDeleting(false);
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  return (
    <section id="CourseList" className="flex flex-col w-full rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]">
      {users.map((u) => (
        <UserItem key={u.id} id={u.id} name={u.name} role={u.role} deleteId={deleteId} onDelete={askDelete}/>
      ))}
      <ConfirmDialog
        open={confirmOpen}
        title="Hapus User?"
        description="Tindakan ini akan menghapus user secara permanen. Lanjutkan?"
        confirmText="Hapus"
        cancelText="Batal"
        isLoading={isDeleting}
        onClose={() => {
          if (!isDeleting) {
            setConfirmOpen(false);
            setDeleteId(null);
          }
        }}
        onConfirm={handleDelete}
      />
    </section>
  )
}
