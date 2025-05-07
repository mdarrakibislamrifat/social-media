"use client";

import {
  useState,
  useRef,
  type KeyboardEvent,
  type ChangeEvent,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";

export default function SubmitCodePage() {
  const [verificationCode, setVerificationCode] = useState<string[]>(
    Array(6).fill("")
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value.slice(0, 1);

    setVerificationCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const code = verificationCode.join("");
    if (code.length !== 6) return;

    setIsLoading(true);
    try {
      const savedCode = localStorage.getItem("resetCode");
      console.log("Saved code from localStorage:", savedCode);

      if (savedCode && code === savedCode) {
        toast.success("Code verified!");
        router.push("/reset-password");
      } else {
        toast.error("Invalid code. Try again.");
      }
    } catch (error) {
      console.error("Verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setVerificationCode(Array(6).fill(""));

    try {
      toast.success("Code resent (simulated).");
    } catch (error) {
      toast.error("Error resending code.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Enter Verification Code
          </h1>
          <p className="text-gray-600 mb-8">
            Please check your email for the verification code.
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={verificationCode[i]}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(i, e.target.value)
              }
              className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              disabled={isLoading}
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={verificationCode.join("").length !== 6 || isLoading}
          className="w-full py-3 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
        >
          Submit
        </button>

        <div className="text-center mt-4">
          <button
            onClick={handleResendCode}
            disabled={isLoading}
            className="text-blue-600 hover:underline disabled:opacity-70"
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
}
