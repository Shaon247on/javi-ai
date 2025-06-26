const BASE_URL = "https://alibackend.duckdns.org";

export async function signup(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/authentication_app/signup/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Signup failed");
  return res.json();
}

export async function verifyOtp(email: string, otp: string) {
  const res = await fetch(`${BASE_URL}/authentication_app/verify_otp/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, otp }),
  });
  if (!res.ok) throw new Error("OTP verification failed");
  return res.json();
}

export async function resendOtp(email: string) {
  const res = await fetch(`${BASE_URL}/authentication_app/resend_otp/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("Resend OTP failed");
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/authentication_app/signin/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
} 