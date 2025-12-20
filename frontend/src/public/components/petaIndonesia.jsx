// src/components/PetaKepulauanHotspot.jsx
import { useNavigate } from "react-router-dom";
import mapImg from "../assets/images/map.png";

const PULAU = [
  { key: "sumatera", label: "Sumatera", top: "46%", left: "18%" },
  { key: "jawa", label: "Jawa", top: "63%", left: "37%" },
  { key: "kalimantan", label: "Kalimantan", top: "33%", left: "41%" },
  { key: "sulawesi", label: "Sulawesi", top: "43%", left: "61%" },
  { key: "bali-nt", label: "Bali & Nusa Tenggara", top: "69%", left: "50%" },
  { key: "maluku", label: "Maluku", top: "55%", left: "70%" },
  { key: "papua", label: "Papua", top: "46%", left: "88%" },
];


export default function PetaIndonesia() {

  const navigate = useNavigate();

  const go = (key) => {
    navigate(`/cerita/${key}`);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <img
        src={mapImg}
        alt="Peta Kepulauan Indonesia"
        className="w-full h-auto rounded-md shadow-sm select-none pointer-events-none"
      />

      {PULAU.map((i) => (
        <button
          key={i.key}
          onClick={() => go(i.key)}
          style={{ top: i.top, left: i.left, transform: "translate(-50%, -50%)" }}
          className="
            absolute px-2 py-1 text-xs sm:text-sm font-semibold
            bg-black/60 text-white rounded-full
            hover:bg-black/80 transition
            focus:outline-none focus:ring-2 focus:ring-white/60
          "
          aria-label={`Lihat cerita pulau ${i.label}`}
          title={i.label}
        >
          {i.label}
        </button>
      ))}
    </div>
  )
}
