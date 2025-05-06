"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import LogoPNG from "../../../public/images/Vector.jpg";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    try {
      console.log("Sending reset code to:", data.email);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Password reset error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-12">
              <Image
                src={LogoPNG}
                alt="LOQO"
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Forget Password!
          </h1>
          <p className="text-gray-600 mb-6">
            Enter Your Registered Email Below
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="georgia.young@example.com"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              {...register("email")}
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-start">
            <p className="text-sm text-gray-600">
              Remember the password?{" "}
              <Link
                href="/login"
                className="font-medium text-blue-900 hover:text-blue-800"
              >
                Sign In
              </Link>
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#000080] text-white font-medium rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70 mt-4"
          >
            Send Code
          </button>
        </form>
      </div>
    </div>
  );
}
