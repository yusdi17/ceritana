import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { pulauSchema } from '../../../utils/zodSchema'
import { useMutation } from '@tanstack/react-query';
import { postPulau } from '../../../service/pulauService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function CreateProvinsiPage() {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(pulauSchema)
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (payload) => postPulau(payload)
  })

  const navigate = useNavigate();
  const onSubmit = async (form) => {
    try {
      const res = await mutateAsync(form);
      toast.success("Pulau berhasil ditambahkan");
      navigate("/dashboard/provinsi");
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      <header className="flex items-center justify-between gap-[30px]">
        <div>
          <h1 className="font-extrabold text-[28px] leading-[42px]">Provinsi Baru</h1>
          <p className="text-[#838C9D] mt-[1]">Selau ada cerita di setiap daerahnya</p>
        </div>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} action="manage-course.html" className="flex flex-col w-[550px] rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]">
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="title" className="font-semibold">Nama Provinsi</label>
          <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
            <img src="/assets/images/icons/note-favorite-black.svg" className="w-6 h-6" alt="icon" />
            <input type="text" name="name" id="title" className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent" placeholder="Tuliskan nama provinsi" required {...register("name")} />
          </div>
        </div>

        <div className="flex items-center gap-[14px]">
          <button type="submit" className="w-full rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#662FFF] text-nowrap">
            Create Now
          </button>
        </div>
      </form>
    </>
  )
}
