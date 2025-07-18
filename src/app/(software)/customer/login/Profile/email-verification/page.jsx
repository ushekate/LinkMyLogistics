'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function EmailVerification() {
    const router = useRouter();
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputsRef = useRef([]);

    
    const handleChange = (index, value) => {
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);


            if (value && index < 3) {
                inputsRef.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const code = otp.join('');
        console.log('Entered OTP:', code);


        if (code === '1234') {
            router.push('/customer/login/Profile/document-verification');
        } else {
            alert('Invalid OTP');
        }
    };

    return (
        <div className="min-h-screen sm:min-h-screen flex items-center justify-center p-4 bg-[var(--background)]">
            <div className="bg-[var(--accent)] rounded-xl shadow-md w-full max-w-md p-8 text-center">

                <div className="flex justify-between items-center mb-8">
                    {[1, 2, 3].map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center text-sm">
                            <div
                                className={cn(
                                    'w-7 h-7 rounded-full flex items-center justify-center',
                                    idx === 0 ? 'bg-[#2E7D32] text-white' : 'bg-gray-200 text-gray-700'
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
                <div className="w-full h-1 bg-gray-200 mb-6">
                    <div className="h-full bg-[#2E7D32] w-1/3 rounded" />
                </div>


                <div className="flex justify-center items-center mb-6">
                    <div className="bg-[#2E7D32] text-white rounded-full p-3">
                        <Mail className="w-6 h-6 bg-[#2E7D32]" />
                    </div>
                </div>
                <h2 className="text-xl font-semibold mb-1">Email Verification</h2>
                <p className="text-sm text-gray-600 mb-6">Enter the OTP sent to your email</p>


                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center space-x-3">
                        {otp.map((digit, idx) => (
                            <input
                                key={idx}
                                type="text"
                                inputMode="numeric"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(idx, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e, idx)}
                                ref={(el) => (inputsRef.current[idx] = el)}
                                className="w-12 h-12 text-center text-xl border-gray-400 border "
                            />
                        ))}
                    </div>

                    <button type="submit" className="w-full bg-[#2E7D32] h-10 rounded text-white">
                        Verify OTP
                    </button>
                </form>

                <p className="text-sm text-gray-600 mt-4">
                    Didn't receive code? <span className="font-medium text-black cursor-pointer">Resend</span>
                </p>
            </div>
        </div>
    );
}
