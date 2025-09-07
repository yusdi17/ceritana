import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { getProvinsi, postCerita } from '../../../service/ceritaService';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ceritaSchema } from '../../../utils/zodSchema';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
export default function CreateCeritaPage({
  schema = ceritaSchema,
  defaultValues,
  provinsiOptions,
  onSubmit: onSubmitProp,
  isSubmitting = false,
  submitText = "Create Now",
  apiKeyTiny,
}) {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const { data: provinsi = [], isLoading: isProvLoading, isError: isProvError } = useQuery({
    queryKey: ['provinsiOptions'],
    queryFn: getProvinsi,
  });

  const provinsiList = provinsiOptions ?? provinsi;
  const provLoading = provinsiOptions ? false : isProvLoading;
  const provError = provinsiOptions ? false : isProvError;

  const { register, control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(ceritaSchema),
    defaultValues: defaultValues ?? {
      judul: '',
      provinsi_id: '',
      is_published: '',
      cerita: '',
      thumbnail: undefined,
    }
  });

  useEffect(() => {
    if (!defaultValues) return;
    reset(defaultValues);
    setPreview(defaultValues.thumbnail_url ?? null);
  }, [defaultValues, reset]);

  const { isPending: isCreating, mutateAsync } = useMutation({ mutationFn: postCerita });

  const onSubmitCreate = async (form) => {
    try {
      await mutateAsync(form);
      reset();
      toast.success("Cerita berhasil ditambahkan");
      navigate("/dashboard/cerita");
    } catch (error) {
      const msg = error?.response?.data?.message || "Gagal menambah cerita";
      toast.error(msg);
      console.error(error);
    }
  };

  const onSubmit = onSubmitProp ? onSubmitProp : onSubmitCreate;
  const submitting = onSubmitProp ? isSubmitting : isCreating;

  const handleThumbChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(null);
  };

  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview); };
  }, [preview]);

  return (
    <>
      <header className="flex items-center justify-between gap-[30px]">
        <div>
          <h1 className="font-extrabold text-[28px] leading-[42px]">Cerita Baru</h1>
          <p className="text-[#838C9D] mt-[1]">Klik daerahnya jelajahi ceritanya</p>
        </div>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} action="manage-course.html" className="flex flex-col w-[550px] rounded-[30px] p-[30px] gap-[30px] bg-[#F8FAFB]">
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="title" className="font-semibold">Judul Cerita</label>
          <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
            <img src="/assets/images/icons/note-favorite-black.svg" className="w-6 h-6" alt="icon" />
            <input type="text" name="title" id="title" className="appearance-none outline-none w-full py-3 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent" placeholder="Tuliskan judul cerita" required {...register("judul")} />
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="thumbnail" className="font-semibold">Add a Thumbnail</label>
          <div className="relative flex shrink-0 w-full h-[200px] rounded-[20px] border border-[#CFDBEF] overflow-hidden">
            <button
              type="button"
              className="absolute inset-0 flex justify-center items-center gap-3 z-0"
              onClick={() => fileRef.current?.click()} 
            >
              <img src="/assets/images/icons/gallery-add-black.svg" className="w-6 h-6" alt="icon" />
              <span className="text-[#838C9D]">Add an attachment</span>
            </button>
            {preview && (
              <img
                src={preview}
                alt="thumbnail"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <input
            ref={fileRef}
            id="thumbnail"
            type="file"
            accept="image/*"
            className="hidden"
            {...register('thumbnail', { onChange: handleThumbChange })}
          />
          {errors.thumbnail && <small className="text-red-500">{errors.thumbnail.message}</small>}
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="provinsi_id" className="font-semibold">Provinsi</label>
          <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
            <img src="/assets/images/icons/bill-black.svg" className="w-6 h-6" alt="icon" />
            <select
              id="provinsi_id"
              className="appearance-none outline-none w-full py-3 px-2 -mx-2 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent"
              {...register("provinsi_id")}
              disabled={isProvLoading || isProvError}
            >
              <option value="" hidden>Pilih Provinsi</option>
              {provinsi.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            {isProvLoading && <small className="text-gray-500">Memuat provinsi…</small>}
            {isProvError && <small className="text-red-500">Gagal memuat provinsi</small>}
            {errors.provinsi_id && <small className="text-red-500">{errors.provinsi_id.message}</small>}
            <img src="/assets/images/icons/arrow-down.svg" className="w-6 h-6" alt="icon" />
          </div>
        </div>
        <div className="flex flex-col gap-[10px]">
          <label htmlFor="is_published" className="font-semibold">Status</label>
          <div className="flex items-center w-full rounded-full border border-[#CFDBEF] gap-3 px-5 transition-all duration-300 focus-within:ring-2 focus-within:ring-[#662FFF]">
            <img src="/assets/images/icons/bill-black.svg" className="w-6 h-6" alt="icon" />
            <select name="category" id="is_published" className="appearance-none outline-none w-full py-3 px-2 -mx-2 font-semibold placeholder:font-normal placeholder:text-[#838C9D] !bg-transparent" {...register("is_published")}>
              <option value="" hidden>Pilih Status</option>
              <option value="true">Publish</option>
              <option value="false">Draft</option>
            </select>
            {errors.is_published && <small className="text-red-500">{errors.is_published.message}</small>}
            <img src="/assets/images/icons/arrow-down.svg" className="w-6 h-6" alt="icon" />
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <label className="font-semibold">Content Text</label>
          <Controller
            name="cerita"
            control={control}
            render={({ field }) => (
              <Editor
                apiKey="v0ogmyye1l91uf87s0ry1gp45awlwblwjoaggk5ax602nnax" 
                value={field.value}
                onEditorChange={field.onChange}
                init={{
                  height: 350,
                  menubar: false,
                  plugins: 'link lists table image code',
                  toolbar: 'undo redo | blocks | bold italic underline | bullist numlist | link image table | code',
                }}
              />
            )}
          />
          {errors.cerita && <small className="text-red-500">{errors.cerita.message}</small>}
        </div>
        <div className="flex items-center gap-[14px]">
          <button type="submit" disabled={submitting} className="w-full rounded-full p-[14px_20px] font-semibold text-[#FFFFFF] bg-[#662FFF] text-nowrap">
            {submitting ? "Menyimpan..." : "Create Now"}
          </button>
        </div>
      </form>
    </>
  )
}
