"use client"
import React, { useState, useEffect } from "react";
import { useLoginMutation } from "../../store/apiSlice";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/authSlice";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      if (res && res.accessToken) {
        dispatch(loginSuccess({ token: res.accessToken }));
        localStorage.setItem("token", res.accessToken);
        setSuccess(true);
      }
    } catch (err) {
      // error handled by RTK Query
    }
  };

  useEffect(() => {
    if (success) {
      const timeout = setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [success, router]);

  if (success) {
    return (
      <div className="text-green-600 font-semibold flex flex-col items-center gap-4">
        Login successful! Redirecting...
        <button className="underline text-blue-600" onClick={() => router.push("/dashboard")}>Go to Dashboard</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
      {error && <div className="text-red-500 text-sm">{(error as any).data?.message || "Login failed"}</div>}
      <button type="submit" className="bg-black text-white py-2 rounded font-semibold mt-2" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm; 