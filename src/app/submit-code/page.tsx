"use client";

import type React from "react";

import {
  useState,
  useRef,
  type KeyboardEvent,
  type ChangeEvent,
  useEffect,
} from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import LogoPNG from "../../../public/images/Vector.jpg";

export default function VerificationCodePage() {
  const [verificationCode, setVerificationCode] = useState<string[]>(
    Array(6).fill("")
  );
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value.slice(0, 1);

    setVerificationCode(newVerificationCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Check if pasted content is a number and has the right length
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, 6).split("");
    const newVerificationCode = [...verificationCode];

    digits.forEach((digit, index) => {
      if (index < 6) {
        newVerificationCode[index] = digit;
      }
    });

    setVerificationCode(newVerificationCode);

    // Focus the next empty input or the last input
    const nextEmptyIndex = newVerificationCode.findIndex((val) => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async () => {
    const code = verificationCode.join("");
    if (code.length !== 6) return;

    setIsLoading(true);

    try {
      console.log("Submitting verification code:", code);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Verification successful");
    } catch (error) {
      console.error("Verification error:", error);
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

          <div className="flex justify-center mb-4">
            <div className="bg-[#000080] rounded-full p-4 w-16 h-16 flex items-center justify-center">
              <Check className="h-8 w-8 text-white" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">Success</h1>
          <p className="text-gray-600 mb-8">
            Please Check Your Email For Verification Code
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={verificationCode[index]}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(index, e.target.value)
              }
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(index, e)
              }
              onPaste={index === 0 ? handlePaste : undefined}
              className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              disabled={isLoading}
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={verificationCode.join("").length !== 6 || isLoading}
          className="w-full py-3 px-4 bg-[#000080] text-white font-medium rounded-md hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
