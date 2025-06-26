'use client';
import RegisterForm from '../../components/auth/RegisterForm';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <RegisterForm onGoToVerification={(email) => router.push(`/verificationCode?email=${encodeURIComponent(email)}`)} />
      <p className="mt-4 text-sm">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 underline">Login</Link>
      </p>
    </div>
  );
} 