'use client';
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthForm: React.FC = () => {
  const [tab, setTab] = useState<"login" | "register">("login");

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded shadow">
      <div className="flex mb-6">
        <button
          className={`flex-1 py-2 font-semibold border-b-2 ${tab === "login" ? "border-black" : "border-gray-200"}`}
          onClick={() => setTab("login")}
        >
          Login
        </button>
        <button
          className={`flex-1 py-2 font-semibold border-b-2 ${tab === "register" ? "border-black" : "border-gray-200"}`}
          onClick={() => setTab("register")}
        >
          Register
        </button>
      </div>
      {tab === "login" ? <LoginForm /> : <RegisterForm onGoToLogin={() => setTab("login")} />}
    </div>
  );
};

export default AuthForm; 