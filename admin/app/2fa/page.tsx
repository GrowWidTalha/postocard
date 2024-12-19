"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { InputOTP } from "@/components/ui/input-otp";

export default function OTPPage() {

  const [loading, setLoading] = useState(false);

  const handleOTPComplete = (otp: string) => {
    setLoading(true);

    // Simulate backend verification
    setTimeout(() => {
      setLoading(false);

      if (otp === "123456") {
        ({
          title: "Success!",
          description: "OTP verification successful.",
        });
      } else {
        ({
          title: "Error",
          description: "Invalid OTP, please try again.",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">OTP Verification</h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter the 6-digit OTP sent to your email or phone.
        </p>

        {/* OTP Input Component */}
        <InputOTP length ={6} onComplete={handleOTPComplete} />

        {/* Button for manual submission */}
        <Button
          disabled={loading}
          className="w-full mt-6"
          onClick={() =>({ title: "Enter OTP to verify" })}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>
      </div>
      <Toaster />
    </div>
  );
}
