'use client';

import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] p-4">
      <div className="bg-[var(--accent)] rounded-xl shadow-md w-full max-w-md p-8 text-center">

        <div className="flex justify-between items-center mb-8">
          {[1, 2, 3].map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-sm">
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center',
                  idx === 2 ? 'bg-[#2E7D32] text-white' : 'bg-gray-200 text-gray-700'
                )}
              >
                {step}
              </div>
              <span className="mt-1 text-xs">
                {['Email Verification', 'Document Upload', 'Successful'][idx]}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full h-1 bg-gray-200 mb-10">
          <div className="h-full bg-[#2E7D32] w-full rounded" />
        </div>


        <div className="flex justify-center mb-6">
          <div className="bg-[#2E7D32] text-white rounded-full p-3">
            <Check className="w-6 h-6" />
          </div>
        </div>


        <h2 className="text-xl font-semibold mb-2">Successfully Verified!</h2>
        <p className="text-sm text-gray-600 mb-6">Your account has been verified successfully</p>


        <button
          className="w-full bg-[#2E7D32] h-10 rounded text-white"
          onClick={() => router.push('/logistics')}
        >
          Continue to Logistics
        </button>
      </div>
    </div>
  );
}
