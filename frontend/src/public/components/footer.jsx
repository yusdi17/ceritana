// src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="py-8 mt-10 text-white bg-gray-900">
            <div className="grid max-w-6xl grid-cols-1 gap-8 px-4 mx-auto md:grid-cols-3">

                {/* Kolom 1: Info */}
                <div>
                    <h2 className="text-2xl font-bold">Ceritana</h2>
                    <p className="mt-2 text-sm text-gray-300">
                        Klik daerahnya, jelajahi budayanya. Temukan cerita rakyat, tradisi,
                        dan kekayaan budaya Indonesia di sini.
                    </p>
                </div>

                {/* Kolom 2: Navigasi */}
                <div>
                    <h3 className="mb-3 font-semibold">Navigasi</h3>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li><Link to="/peta" className="hover:text-white">Peta Budaya</Link></li>
                        <li><Link to="/cerita" className="hover:text-white">Cerita Rakyat</Link></li>
                        <li><Link to="/kalender" className="hover:text-white">Kalender Budaya</Link></li>
                        <li><Link to="/tentang" className="hover:text-white">Tentang Kami</Link></li>
                    </ul>
                </div>

                {/* Kolom 3: Sosial Media */}
                <div>
                    <h3 className="mb-3 font-semibold">Ikuti Kami</h3>
                    <div className="flex space-x-4 text-xl">
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-400">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-red-500">
                            <i className="fab fa-youtube"></i>
                        </a>
                        <a href="mailto:ceritana@gmail.com" className="hover:text-blue-400">
                            <i className="fas fa-envelope"></i>
                        </a>
                    </div>
                </div>
            </div>

            <p className="mt-8 text-xs text-center text-gray-400">
                © 2025 Ceritana. Semua hak dilindungi.
            </p>
        </footer>
    );
}
