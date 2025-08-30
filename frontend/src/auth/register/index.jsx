import { useState } from "react";
import { registerSchema } from "../../utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "../../service/authService";
import { toast } from "react-toastify";

export default function RegisterModal({ isOpen, onClose, onSwitchToLogin }) {

    const {register, handleSubmit, formState: {errors}, reset} = useForm({
        resolver: zodResolver(registerSchema),
    })

    const {isPending, mutateAsync} = useMutation({
        mutationFn: (payload) => postRegister(payload)
    })
    const onSubmit = async (form) => {
        try {
            const res = await mutateAsync(form);
            toast.success("Register Berhasil!, silahkan cek email untuk aktivasi akun");
            reset();
            if (onSwitchToLogin) {
                onSwitchToLogin();
            }
            console.log(res);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
        
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
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Masukan email kamu"
                            required
                            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            {...register("email")}
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            User name
                        </label>
                        <input
                            type="text"
                            placeholder="Masukan username kamu"
                            required
                            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            {...register("name")}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Masukan password kamu"
                            required
                            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            {...register("password")}
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="Masukan kembali password kamu"
                            required
                            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            {...register("password_confirmation")}
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isPending}
                        style={{ backgroundColor: "#323232" }}
                        className="w-full px-4 py-2.5 font-medium text-white transition-colors rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                         {isPending ? "Processing" : "Register"}
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