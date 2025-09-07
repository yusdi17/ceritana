import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(3),
  name: z.string().min(3),
  password: z.string().min(8),
  password_confirmation: z.string().min(8),
})

export const loginSchema = registerSchema.omit({
  name: true,
  password_confirmation: true
})

export const pulauSchema = z.object({
  name: z.string().min(3),
})

export const ceritaSchema = z.object({
  judul: z.string().min(3, "Judul minimal 3 karakter"),
  provinsi_id: z.string().min(1, "Provinsi wajib diisi"),
  is_published: z.enum(["true", "false"], { required_error: "Status wajib" }),
  cerita: z.string().min(3, "Konten minimal 3 karakter"),
  thumbnail: z.any().refine((f) => f?.length === 1, "Thumbnail wajib diunggah"),
})

export const ceritaSchemaEdit = z.object({
  judul: z.string().min(3),
  provinsi_id: z.string().min(1),
  is_published: z.enum(['true','false']),
  cerita: z.string().min(3),
  thumbnail: z.any().optional(),
});