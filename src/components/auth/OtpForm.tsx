"use client"
import React, { useState } from "react";
import { useVerifyOtpMutation, useResendOtpMutation } from "../../store/apiSlice";

type OtpFormProps = {
  email: string;
  onGoToLogin?: () => void;
};

const OtpForm: React.FC<OtpFormProps> = ({ email, onGoToLogin }) => {
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState(false);
  const [verifyOtp, { isLoading, error }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending, error: resendError }] = useResendOtpMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyOtp({ email, otp }).unwrap();
      setSuccess(true);
    } catch (err) {
      // error handled by RTK Query
    }
  };

  const handleResend = async () => {
    try {
      await resendOtp({ email }).unwrap();
    } catch (err) {
      // error handled by RTK Query
    }
  };

  if (success) {
    return (
      <div className="text-green-600 font-semibold flex flex-col items-center gap-4">
        Registration complete! You can now log in.
        {onGoToLogin && (
          <button className="underline text-blue-600" onClick={onGoToLogin}>
            Go to Login
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <p className="text-gray-700 text-sm mb-2">Enter the OTP sent to <span className="font-semibold">{email}</span></p>
      <input
        type="text"
        placeholder="OTP"
        className="border rounded px-4 py-2"
        value={otp}
        onChange={e => setOtp(e.target.value)}
        required
      />
      {error && <div className="text-red-500 text-sm">{(error as any).data?.message || "OTP verification failed"}</div>}
      {resendError && <div className="text-red-500 text-sm">{(resendError as any).data?.message || "Failed to resend OTP"}</div>}
      <button type="submit" className="bg-black text-white py-2 rounded font-semibold mt-2" disabled={isLoading}>
        {isLoading ? "Verifying..." : "Verify OTP"}
      </button>
      <button type="button" className="text-blue-600 underline text-sm mt-2" onClick={handleResend} disabled={isResending}>
        {isResending ? "Resending..." : "Resend OTP"}
      </button>
    </form>
  );
};

export default OtpForm; 