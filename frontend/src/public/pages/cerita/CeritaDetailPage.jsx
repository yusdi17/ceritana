// src/public/pages/cerita/CeritaDetailPage.jsx
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify"; // npm i dompurify
import { getCeritaBySlug } from "../../../service/ceritaService";

function DetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 animate-pulse">
      <div className="mx-auto h-56 sm:h-64 w-full max-w-[560px] bg-slate-200 rounded" />
      <div className="h-6 w-48 bg-slate-200 rounded mx-auto mt-4" />
      <div className="space-y-3 mt-6">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-4 bg-slate-200 rounded" />
        ))}
      </div>
    </div>
  );
}

export default function CeritaDetailPage() {
  const { slug } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ceritaDetail", slug],
    queryFn: () => getCeritaBySlug(slug),
  });

  if (isLoading) return <DetailSkeleton />;

  if (isError || !data) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-red-600">Cerita tidak ditemukan atau tidak bisa ditampilkan.</p>
        <Link to="/peta" className="underline mt-2 inline-block">← Kembali</Link>
      </div>
    );
  }

  const img = data.thumbnail_url || "/assets/images/thumbnails/th-1.png";
  const published = data.published_at
    ? new Date(data.published_at).toLocaleDateString()
    : null;

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      {/* Gambar */}
      <img
        src={img}
        alt={data.judul}
        className="mx-auto w-full max-w-[560px] h-56 sm:h-64 object-cover rounded"
        onError={(e) => { e.currentTarget.src = "/assets/images/thumbnails/th-1.png"; }}
      />

      {/* Judul */}
      <h1 className="text-center text-xl sm:text-2xl font-extrabold mt-3">
        {data.judul}
      </h1>

      {/* Meta */}
      <div className="mt-2 flex items-center justify-center gap-3 text-xs text-slate-500">
        {data.provinsi?.name && (
          <span className="px-2 py-0.5 rounded-full bg-slate-100 border">
            {data.provinsi.name}
          </span>
        )}
        {published && <span>{published}</span>}
      </div>

      {/* Konten */}
      {/* Jika kamu punya plugin @tailwindcss/typography, pakai `prose prose-slate max-w-none` di container di bawah */}
      <div
        className="mt-6 leading-7 text-slate-700 [&>p]:mb-4 [&>h2]:mt-6 [&>h2]:mb-2 [&>ul]:list-disc [&>ul]:pl-5"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.cerita || "") }}
      />

      <div className="mt-8 text-center">
        <Link to="/" className="inline-block underline">← Kembali</Link>
      </div>
    </article>
  );
}
