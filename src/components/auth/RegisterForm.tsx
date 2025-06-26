"use client"
import React, { useState } from "react";
import { useSignupMutation } from "../../store/apiSlice";
import OtpForm from "./OtpForm";

interface RegisterFormProps {
  onGoToVerification?: (email: string) => void;
  onGoToLogin?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onGoToVerification, onGoToLogin }) => {
  const [step, setStep] = useState<"register" | "otp">("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [signup, { isLoading, error }] = useSignupMutation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }
    try {
      await signup({ email, password }).unwrap();
      if (onGoToVerification) {
        onGoToVerification(email);
      } else {
        setStep("otp");
      }
    } catch (err: any) {
      // error handled by RTK Query
    }
  };

  if (step === "otp") {
    return <OtpForm email={email} onGoToLogin={onGoToLogin} />;
  }

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Email"
        className="border rounded px-4 py-2"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="border rounded px-4 py-2"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="border rounded px-4 py-2"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        required
      />
      {localError && <div className="text-red-500 text-sm">{localError}</div>}
      {error && <div className="text-red-500 text-sm">{(error as any).data?.message || "Registration failed"}</div>}
      <button type="submit" className="bg-black text-white py-2 rounded font-semibold mt-2" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm; 