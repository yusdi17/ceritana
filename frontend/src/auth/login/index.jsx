import { useState } from "react";

export default function LoginModal({ isOpen, onClose, onSwitchToRegister  }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login attempted with:", { email, password });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="relative w-full max-w-lg p-10 mx-4 bg-white rounded-lg shadow-xl">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute text-xl font-bold text-red-500 top-4 right-4 hover:text-red-700"
                >
                    <i className="fa-solid fa-x" style={{ color: "#cb1c08" }}></i>
                </button>

                {/* Header */}
                <div className="mb-8">
                    <p className="mb-2 text-sm text-gray-600">Welcome to Ceritana</p>
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Sign in
                    </h2>
                </div>

                {/* Form */}
                <div className="space-y-6">
                    {/* Email */}
                    <div>
                        <label className="block mb-3 text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Masukan email kamu"
                            required
                            className="w-full px-4 py-3 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-3 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Masukan password kamu"
                                required
                                className="w-full px-4 py-3 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                            >
                            </button>
                        </div>
                        <div className="mt-2 text-right">
                            <button type="button" className="text-sm text-gray-600 hover:text-gray-800">
                                Forgot Password?
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        style={{ backgroundColor: "#323232" }}
                        className="w-full px-4 py-3 font-medium text-white transition-colors rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Login
                    </button>

                </div>

                {/* Google Login */}
                <button
                    style={{ backgroundColor: "#323232" }}
                    className="flex items-center justify-center w-full px-4 py-3 mt-3 font-medium text-white transition-colors rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 533.5 544.3">
                        <path fill="#4285F4" d="M533.5 278.4c0-18.5-1.6-37-4.9-54.9H272v103.9h146.9c-6.3 34-25.6 62.7-54.5 82.1l88.2 68.5c51.4-47.4 80.9-117.3 80.9-199.6z" />
                        <path fill="#34A853" d="M272 544.3c73.7 0 135.6-24.5 180.8-66.7l-88.2-68.5c-24.5 16.4-55.7 26-92.6 26-71 0-131.2-47.9-152.9-112.2l-91.5 70.5c44.5 88.1 135.9 150.9 244.4 150.9z" />
                        <path fill="#FBBC05" d="M119.1 322.9c-10.8-32-10.8-66.9 0-98.9L27.6 153.5C-9.2 226.7-9.2 317.6 27.6 390.8l91.5-67.9z" />
                        <path fill="#EA4335" d="M272 107.7c39.9-.6 77.8 14.6 106.5 42.6l79.5-77.6C407.3 27.5 340.3-.6 272 0 163.5 0 72.1 62.8 27.6 150.9l91.5 70.5C140.8 155.6 201 107.7 272 107.7z" />
                    </svg>
                    Sign in with Google
                </button>


                {/* Footer */}
                <div className="mt-6 text-sm text-center text-gray-600">
                    <p>
                        Don't have an account?{" "}
                        <button
                            onClick={onSwitchToRegister}   
                            className="font-medium text-gray-900 hover:underline"
                        >
                            Register
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}