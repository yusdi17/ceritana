import { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../../auth/login";
import RegisterModal from "../../auth/register";
import secureLocalStorage from "react-secure-storage";

export default function Navbar() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const user = secureLocalStorage.getItem("user");

    return (
        <>
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-2 bg-white bg-opacity-10 backdrop-blur-md">

                {/* Logo */}
                <Link to="/" className="flex items-center no-underline">
                    <div className="flex items-center justify-center w-8 h-8 bg-[#323232] rounded-lg">
                        <span className="text-xs font-bold text-white">C</span>
                    </div>
                    <span className="ml-2 text-sm font-semibold text-white">Ceritana</span>
                </Link>

                {/* Auth Buttons */}
                {user ? (
                    <>
                        <div className="flex items-center space-x-3">
                            <span className="ml-2 text-sm font-semibold text-white">Hi, {user.name}</span>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setIsLoginModalOpen(true)}
                                className="px-4 py-1.5 text-sm font-medium text-white bg-[#323232] rounded-full shadow-sm transition duration-200 hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setIsRegisterOpen(true)}
                                className="px-4 py-1.5 text-sm font-medium text-[#323232] bg-white border border-gray-300 rounded-full shadow-sm transition duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
                            >
                                Register
                            </button>
                        </div>
                    </>
                )}


            </nav>

            {/* Login Modal */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onSwitchToRegister={() => {
                    setIsLoginModalOpen(false);
                    setIsRegisterOpen(true);
                }}
            />

            {/* Register Modal */}
            <RegisterModal
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
                onSwitchToLogin={() => {
                    setIsRegisterOpen(false);
                    setIsLoginModalOpen(true);
                }}
            />
        </>
    );
}
