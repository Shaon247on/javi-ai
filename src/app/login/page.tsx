'use client';
import LoginForm from '../../components/auth/LoginForm';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <LoginForm />
      <p className="mt-4 text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/signUp" className="text-blue-600 underline">Sign Up</Link>
      </p>
    </div>
  );
} 