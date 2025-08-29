import { useState } from "react";

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Register attempted with:", { email, username, password, confirmPassword });
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
                <div className="mb-6">
                    <p className="mb-1 text-sm text-gray-600">Welcome to Certiana</p>
                    <h2 className="text-xl font-semibold text-gray-900">Sign up</h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Masukan email kamu"
                            required
                            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            User name
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Masukan username kamu"
                            required
                            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukan password kamu"
                            required
                            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Masukan kembali password kamu"
                            required
                            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        style={{ backgroundColor: "#323232" }}
                        className="w-full px-4 py-2.5 font-medium text-white transition-colors rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Register
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-4 text-sm text-center text-gray-600">
                    <p>
                        Already have an account?{" "}
                        <button
                            onClick={onSwitchToLogin}
                            className="font-medium text-gray-900 hover:underline"
                        >
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>

    );
}