import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import landingpage from "../assets/landingpage.svg";
import landingpage2 from "../assets/landingpage2.svg";
import landingpage3 from "../assets/landingpage3.svg";
import Navbar from "../components/navbar";
import LoginModal from "../../auth/login";
import RegisterModal from "../../auth/register";

export default function LandingPage() {
    const backgrounds = [
        landingpage,
        landingpage2,
        landingpage3
    ];

    const [currentBackground, setCurrentBackground] = useState(0);

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [redirectAfterLogin, setRedirectAfterLogin] = useState("/");

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.showLogin) {
            setIsLoginOpen(true);
            const from = location.state?.from?.pathname || "/";
            setRedirectAfterLogin(from);
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, navigate]);

    const handleLoginSuccess = () => {
        setIsLoginOpen(false);
        navigate(redirectAfterLogin, { replace: true });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [backgrounds.length]);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <Navbar />
            <div className="relative w-full h-full">
                {backgrounds.map((bg, index) => (
                    <img
                        key={index}
                        src={bg}
                        alt={`Background ${index + 1}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentBackground ? "opacity-100" : "opacity-0"
                            }`}
                    />
                ))}
            </div>

            <div className="absolute bottom-0 w-full bg-white p-8 flex flex-col items-center shadow-lg">
                <p className="text-gray-700 text-center text-lg mb-4">
                    Temukan cerita rakyat dari berbagai budaya di Indonesia dalam satu klik.
                    Klik daerahnya, dengar kisahnya, dan kenali cerita didalamnya!
                </p>
                <Link
                    to="/peta"
                    className="text-white px-6 py-2 rounded-xl transition-colors duration-200 hover:opacity-95"
                    style={{ backgroundColor: '#323232' }}
                >
                    Lihat Peta
                </Link>
            </div>

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onSwitchToRegister={() => {
                    setIsLoginOpen(false);
                    setIsRegisterOpen(true);
                }}
                onSuccess={handleLoginSuccess}
            />
            <RegisterModal
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
                onSwitchToLogin={() => {
                    setIsRegisterOpen(false);
                    setIsLoginOpen(true);
                }}
            />
        </div>
    );
}