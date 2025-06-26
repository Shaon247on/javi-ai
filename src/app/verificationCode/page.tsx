'use client';
import OtpForm from '../../components/auth/OtpForm';
import { useSearchParams, useRouter } from 'next/navigation';

export default function VerificationCodePage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const router = useRouter();

  if (!email) {
    return <div className="text-red-500">No email provided for verification.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <OtpForm email={email} onGoToLogin={() => router.push('/login')} />
    </div>
  );
} 