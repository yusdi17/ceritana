import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCerita } from "../../../service/ceritaService";
import Navbar from "../../components/navbar";

const PULAU_LABEL = {
  sumatera: "Sumatera",
  jawa: "Jawa",
  kalimantan: "Kalimantan",
  sulawesi: "Sulawesi",
  "bali-nt": "Bali & Nusa Tenggara",
  maluku: "Maluku",
  papua: "Papua",
};

const stripHtml = (html = "") =>
  html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const truncate = (s = "", n = 120) => (s.length > n ? s.slice(0, n) + "…" : s);

function CardSkeleton() {
  return (
    <article className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm">
      <div className="h-36 bg-slate-200 animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-2/3 bg-slate-200 animate-pulse rounded" />
        <div className="h-3 w-5/6 bg-slate-200 animate-pulse rounded" />
        <div className="h-3 w-4/6 bg-slate-200 animate-pulse rounded" />
      </div>
    </article>
  );
}

function StoryCard({ item }) {
  const img = item.thumbnail_url || "/assets/images/thumbnails/th-1.png";
  const excerpt = truncate(stripHtml(item.cerita || ""), 140);

  return (
    <article className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
      <Link to={`/story/${item.slug}`} className="block">
        <img
          src={img}
          alt={item.judul}
          className="w-full h-36 object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/assets/images/thumbnails/th-1.png";
          }}
        />
      </Link>
      <div className="p-4">
        <Link
          to={`/story/${item.slug}`}
          className="block font-semibold text-slate-900 hover:text-indigo-600 line-clamp-1"
          title={item.judul}
        >
          {item.judul}
        </Link>

        <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
          <img src="/assets/images/icons/crown-purple.svg" className="w-4 h-4" alt="" />
          <span>{item.provinsi?.name ?? "-"}</span>
        </div>

        <p className="mt-2 text-sm text-slate-500 line-clamp-3">{excerpt}</p>
      </div>
    </article>
  );
}

export default function CeritaPulauPage() {
  const { pulauKey } = useParams();
  const title = PULAU_LABEL[pulauKey] || "Semua";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["ceritaPulau", pulauKey],
    queryFn: () => getCerita({ pulau: pulauKey, per_page: 50 }),
  });

  const list = Array.isArray(data?.data) ? data.data : data || [];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-extrabold">Cerita {title}</h1>
        <p className="text-slate-500">Kumpulan cerita dari provinsi di {title}.</p>
      </header>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && <div className="text-red-600">Gagal memuat cerita.</div>}

      {!isLoading && !isError && (
        list.length === 0 ? (
          <div className="text-slate-500">Belum ada cerita.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {list.map((item) => (
              <StoryCard key={item.id} item={item} />
            ))}
          </div>
        )
      )}
    </div>
  );
}
